/**
 *
 * @param {*} acc
 * @param {*} curr
 * @param {*} ind
 */
function pipeGenerator(acc, curr, ind) {
  if (ind === 1 && acc && acc.constructor === Function) {
    let executed = acc();
    if (executed && executed.then) {
      return executed.then(acc => curr(acc));
    } else {
      return curr(acc);
    }
  } else if (acc && acc.then) {
    return acc.then(curr => curr(acc));
  } else {
    return curr(acc);
  }
}

/**
 * Function generates a pipeline for functions
 * @param  {...any} fns
 */
const pipe = function(...fns) {
  return fns.length === 1
    ? fns[0].constructor === Function
      ? fns[0]()
      : fns[0]
    : fns.reduce(pipeGenerator);
};

module.exports = { pipe, pipeGenerator };
