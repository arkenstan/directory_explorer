module.exports = function(context) {
  const { structure, command } = context;
  if (command.type === 'create') {
    if (command.optionArgs[1] && !structure[command.optionArgs[1]]) {
      throw new Error(`Doesn't Exist`);
    }
  } else if (command.type === 'delete') {
    if (command.optionArgs[0] && !structure[command.optionArgs[0]]) {
      throw new Error(`Doesn't Exist`);
    }
  } else if (command.type === 'move') {
    if (command.optionArgs[0] && !structure[command.optionArgs[0]]) {
      throw new Error(`Target doesn't exists`);
    } else if (command.optionArgs[1] && !structure[command.optionArgs[0]]) {
      throw new Error(`Destination doesn't exists`);
    } else if (command.flag === 'before' || command.flag === 'after') {
      if (!structure[command.flagArgs[0]]) {
        throw new Error(`Flag argument doesn't exists`);
      }
    }
  }
  return context;
};
