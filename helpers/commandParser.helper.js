const parser = function(cmd) {
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
};

module.exports = parser;
