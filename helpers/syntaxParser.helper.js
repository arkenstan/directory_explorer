/**
 *
 * @param {*} cmd
 */
let syntaxParser = function(cmd) {
  let cmdReg = new RegExp(/\b(create|move|delete)\b \b(item|dir)\b ([\w\d-]+)/, 'g');
  let splittedCmd = cmd.split(' ');
  return cmdReg.test(cmd);
};

module.exports = { syntaxParser };
