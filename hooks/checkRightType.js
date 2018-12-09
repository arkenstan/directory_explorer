module.exports = function(context) {
  const { structure, command } = context;
  if (command.type === 'create') {
    if (command.optionArgs[1] && structure[command.optionArgs[1]].type === 'item') {
      throw new Error(`Invalid operation`);
    }
  } else if (command.type === 'move') {
    if (command.optionArgs[0] && structure[command.optionArgs[0]].type !== command.option) {
      throw new Error(`Invalid operation`);
    } else if (command.optionArgs[1] && structure[command.optionArgs[1]].type === 'item') {
      throw new Error(`Invalid destination type`);
    }
  } else if (command.type === 'delete') {
    if (command.optionArgs[0] && structure[command.optionArgs[0]].type !== command.option) {
      throw new Error(`Invalid operation`);
    }
  }
  return context;
};
