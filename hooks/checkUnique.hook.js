module.exports = function(context) {
  const { command } = context;

  if (context.structure[command.optionArgs[0]]) {
    throw new Error('Item already exists');
  }

  return context;
};
