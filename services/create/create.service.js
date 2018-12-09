const { pipeline } = require('../../helpers');
const hooks = require('./create.hooks');

function serviceLogic(context) {
  const { command } = context;
  let source = command.optionArgs[1] || 'root';
  let target = command.optionArgs[0];
  let temp = {
    type: command.option,
    parent: source
  };
  temp = command.option == 'dir' ? { ...temp, dir: [], item: [] } : temp;

  context.structure[temp.parent][command.option].push(target);
  context.structure[target] = { ...temp };

  return context;
}

let service = context => {
  try {
    let output = pipeline(context, ...hooks.before, serviceLogic, ...hooks.after);
    return output;
  } catch (error) {
    console.log(error);
    return pipeline({ ...context, error }, ...hooks.error);
  }
};

module.exports = service;
