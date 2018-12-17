/**
 * Function checks for uniqueness of
 * provided component
 * @param  { structure, command } context
 */
module.exports = function(context) {
  const { command } = context;
  let destinationId = context.structure[command.optionArgs[1]].id;
  let targetId = context.structure[command.optionArgs[0]].id;

  let parentRegex = new RegExp(targetId, 'g');

  let n = destinationId.search(parentRegex);

  if (n === 0) {
    return false;
  }
  return context;
};
