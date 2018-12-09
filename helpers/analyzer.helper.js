let analyzer = function(cmd) {
  let cmdReg = new RegExp(/\b(create|move|delete)\b \b(item|dir)\b ([\w\d-]+)/, 'g');
  return cmdReg.test(cmd);
};

module.exports = analyzer;
