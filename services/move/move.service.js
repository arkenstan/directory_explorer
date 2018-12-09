const { pipeline } = require('../../helpers');
const hooks = require('./move.hooks');

/**
 *
 * @param {*} context
 */
function serviceLogic(context) {
  const { command, structure } = context;
  let target = command.optionArgs[0];
  let parent = structure[target].parent;
  let destination = command.optionArgs[1];

  let indexElement = structure[parent][command.option].indexOf(target);
  if (indexElement == -1) {
    throw new Error('Unable to find item');
  } else {
    context.structure[parent][command.option].splice(indexElement, 1);
    context.structure[target].parent = destination;
  }

  if (command.flag && command.flagCalc) {
    context.structure[destination][command.option].splice(command.flagCalc, 0, target);
  }

  return context;
}

let service = context => {
  try {
    let output = pipeline(context, ...hooks.before, serviceLogic, ...hooks.after, ...hooks.error);
    return output;
  } catch (error) {
    console.log(error);
    return pipeline({ ...context, error }, ...hooks.error);
  }
};

module.exports = service;
