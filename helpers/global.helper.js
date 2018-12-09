const fs = require('fs');
/**
 *
 * @param {*} temp
 * @param {*} cmd
 */
function createAndDeleteParsing(temp, cmd) {
  temp.optionArgs = cmd.slice(2);
  return temp;
}

/**
 *
 * @param {*} temp
 * @param {*} cmd
 */
function moveParsing(temp, cmd) {
  temp.optionArgs = cmd.slice(2, 4);
  temp.flag = cmd[4];
  temp.flagArgs = cmd.slice(5);
  return temp;
}

/**
 * @param {*} passed
 * @param {*} op
 */
function output(passed, op) {
  if (passed) {
    let finalTree = {};

    for (let element in op) {
      if (op[element].type == 'dir') {
        finalTree[element] = { dirs: [], items: [] };
        for (let component of op[element].components) {
          if (op[component].type === 'dir') {
            finalTree[op[component].parent].dirs.push(component);
          } else {
            finalTree[op[component].parent].items.push(component);
          }
        }
      }
    }

    let finalOutput = 'root\n',
      spacer = '  ';
    for (let dir of finalTree['root'].dirs) {
      finalOutput += `${spacer}${dir}\n`;
      for (let childDir of finalTree[dir].dirs) {
      }
    }

    console.log(finalTree);
  } else {
    fs.writeFileSync('output.txt', `failed ${op.cmd}`, function(err, data) {
      if (err) console.log(err);
      console.log('Successfully written to file');
    });
  }
}

module.exports = {
  parsing: {
    create: createAndDeleteParsing,
    delete: createAndDeleteParsing,
    move: moveParsing
  },
  outputWriter: output
};
