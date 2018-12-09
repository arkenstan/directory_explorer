const { pipe, idGenerator } = require('../../helpers');
const hooks = require('./move.hooks');

/**
 *
 * @param {*} context
 */
function serviceLogic(context) {
  const { command, structure } = context;

  // Process Move
  let targetObj = structure[command.optionArgs[0]];
  let destinationObj = structure[command.optionArgs[1]];
  let parentObj = structure[targetObj.parent];

  let newId = idGenerator(destinationObj.id, command.option, destinationObj.components.length);
  context.structure[targetObj.name].parent = destinationObj.name;
  context.structure[targetObj.name].id = newId;
  context.structure[parentObj.name].components.splice(
    parentObj.components.indexOf(targetObj.name),
    1
  );

  if (command.option === 'dir') {
    let moveRegex = new RegExp(targetObj.id, 'g');
    for (let element in structure) {
      if (structure[element].id.search(moveRegex) !== -1) {
        context.structure[element].id = structure[element].id.replace(moveRegex, newId);
      }
    }
  }

  // Process Flag
  if (command.flag && command.flagCalc !== -1) {
    context.structure[destinationObj.name].components.splice(command.flagCalc, 0, targetObj.name);
  } else {
    context.structure[destinationObj.name].components.push(targetObj.name);
  }

  return context;
}

let service = context => {
  try {
    let output = pipe(
      context,
      ...hooks.before,
      serviceLogic,
      ...hooks.after
    );
    return output;
  } catch (error) {
    return false;
  }
};

module.exports = service;
