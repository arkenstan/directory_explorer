module.exports = function(context) {
  const { command, structure } = context;

  if (context.command.flag) {
    if (context.command.flag === 'after' || context.command.flag === 'before') {
      elementIndex = structure[command.optionArgs[1]].components.indexOf(command.flagArgs[0]);
      if (command.flag === 'before') {
        context.command.flagCalc = elementIndex === -1 ? 0 : elementIndex;
      } else if (command.flag === 'after') {
        context.command.flagCalc = elementIndex + 1;
      }
    } else {
      throw new Error('Invalid flag');
    }
  }

  return context;
};
