/**
 *
 * @param {*} id
 * @param {*} option
 * @param {*} len
 */
const idGenerator = function(id, option, len) {
  return `${id}>${option}${len + 1}_${new Date(Math.random() * 3000 + 1).getTime() * 1000}`;
};

module.exports = { idGenerator };
