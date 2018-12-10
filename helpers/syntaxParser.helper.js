/**
 * Function parses the command for correct syntax
 * @param {*} cmd command is given as input
 */
let syntaxParser = function(cmd) {
  let cmdReg = new RegExp(/\b(create|move|delete)\b \b(item|dir)\b ([\w\d_-]+)/, 'g');

  let alphaReg = new RegExp(/^[\w-]+$/);
  let splittedCmd = cmd.split(' ');
  for (let cmdNode of splittedCmd) {
    if (!alphaReg.test(cmdNode)) {
      return false;
    }
  }
  return cmdReg.test(cmd);
};

module.exports = { syntaxParser };
