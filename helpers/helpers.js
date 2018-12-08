const { indexOf, slice } = require('lodash');
const config = {
  ACTIONS: ['create', 'delete', 'move'],
  ELEMENTS: ['dir', 'item'],
  EXTRA: ['before', 'after']
};

module.exports = {
  analyze: function(cmd) {
    let cmdReg = new RegExp(/\b(create|move|delete)\b \b(item|dir)\b ([\w\d-]+)/, 'g');
    return cmdReg.test(cmd);
  },
  commandParser: function(cmd) {
    let temp = {
      type: '',
      option: '',
      optionArgs: [],
      flag: '',
      flagArgs: []
    };
    cmd = cmd.split(' ');

    temp.type = cmd[0];
    temp.option = cmd[1];

    switch (temp.type) {
      case 'create':
      case 'delete':
        temp.optionArgs = cmd.slice(2);
        return temp;
      case 'move':
        temp.optionArgs = cmd.slice(2, 4);
        temp.flag = cmd[4];
        temp.flagArgs = cmd.slice(5);
        return temp;
      default:
        return false;
    }
  }
};
