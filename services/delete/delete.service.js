const { pipe } = require('../../helpers');
const hooks = require('./delete.hooks');

/**
 *
 * @param {*} context
 */
function serviceLogic(context) {
  const { command, structure } = context;
  let targetName = command.optionArgs[0];
  let targetObj = structure[command.optionArgs[0]];
  let parentName = targetObj.parent;
  let idRegex = new RegExp(targetObj.id, 'g');
  if (command.option === 'dir') {
    for (let element in structure) {
      if (structure[element].id.search(idRegex) !== -1) {
        delete context.structure[element];
      }
    }
  } else {
    delete context.structure[targetName];
  }
  context.structure[parentName].components.splice(indexElement, 1);
  return context;
}

let service = function(context) {
  try {
    let output = pipe(
      context,
      ...hooks.before,
      serviceLogic,
      ...hooks.after,
      ...hooks.error
    );
    return output;
  } catch (error) {
    return false;
  }
};

module.exports = service;
