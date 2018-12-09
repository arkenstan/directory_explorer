module.exports = function(context) {
  const { structure, command } = context;
  if (command.type == 'create') {
    if (command.optionArgs[1] && structure[command.optionArgs[1]].type == 'item') {
      console.log('Here');
      throw new Error(`Wrong Component type`);
    }
  } else if (command.type == 'move') {
    if (command.optionArgs[1] && structure[command.optionArgs[1]].type == 'item') {
      throw new Error(`Invalid destination type`);
    }
  }
  return context;
};
