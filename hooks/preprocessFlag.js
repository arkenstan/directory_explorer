module.exports = function(context) {
  if (
    context.command.flag &&
    (context.command.flag == 'after' || context.command.flag == 'before')
  ) {
    const { command, structure } = context;

    elementIndex = structure[command.optionArgs[1]][command.option].indexOf(command.flagArgs[0]);

    if (command.flag == 'before') {
      context.command.flagCalc = elementIndex == 0 ? 0 : elementIndex - 1;
    } else if (command.flag == 'after') {
      context.command.flagCalc = elementIndex + 1;
    } else {
      throw new Error('Invalid flag');
    }
  }

  return context;
};
