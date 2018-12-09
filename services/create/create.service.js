const { pipe, idGenerator } = require('../../helpers');
const hooks = require('./create.hooks');

function serviceLogic(context) {
  const { command } = context;
  let source = command.optionArgs[1] || 'root';
  let target = command.optionArgs[0];
  let { id, components } = context.structure[source];
  let temp = {
    name: target,
    type: command.option,
    parent: source,
    id: idGenerator(id, command.option, components.length)
  };
  temp = command.option === 'dir' ? { ...temp, components: [] } : temp;

  context.structure[temp.parent].components.push(target);
  context.structure[target] = { ...temp };

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
