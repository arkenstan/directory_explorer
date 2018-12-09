const { pipe } = require('../../helpers');
const hooks = require('./delete.hooks');

/**
 *
 * @param {*} context
 */
function serviceLogic(context) {
  const { command, structure } = context;
  let targetObj = structure[command.optionArgs[0]];
  let parentObj = structure[targetObj.parent];
  let idRegex = new RegExp(targetObj.id, 'g');
  if (command.option === 'dir') {
    for (let element in structure) {
      if (structure[element].id.search(idRegex) !== -1) {
        delete context.structure[element];
      }
    }
  } else {
    delete context.structure[targetObj.name];
  }
  elementIndex = parentObj.components.indexOf(targetObj.name);
  context.structure[parentObj.name].components.splice(elementIndex, 1);
  return context;
}

let service = function(context) {
  try {
    let output = pipe(
      context,
      ...hooks.before,
      serviceLogic,
      ...hooks.after
    );
    return output;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = service;
