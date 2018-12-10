const { parsing } = require('./global.helper');
/**
 * Function parses the given command to a desired format
 * @param {*} cmd command is given as an input
 */
const parser = function(cmd) {
  let temp = {
    type: '',
    option: '',
    optionArgs: [],
    flag: '',
    flagArgs: [],
    cmd
  };
  cmd = cmd.split(' ');

  temp.type = cmd[0];
  temp.option = cmd[1];

  return parsing[temp.type](temp, cmd) || false;
};

module.exports = { parser };
