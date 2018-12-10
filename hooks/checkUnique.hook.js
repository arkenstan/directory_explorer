/**
 * Function checks for uniqueness of
 * provided component
 * @param  { structure, command } context
 */
module.exports = function(context) {
  const { command } = context;

  if (context.structure[command.optionArgs[0]]) {
    throw new Error('Element already exists');
  }

  return context;
};
