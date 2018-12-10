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
 *
 * @param {*} passed
 * @param {*} op
 */
function output(passed, op) {
  if (passed) {
    let finalTree = {};

    const accessDirs = (node, spacer) => {
      let glob = '',
        temp = '';
      for (let dir of node.dirs) {
        temp = accessDirs(finalTree[dir], `${spacer}  `);
        glob += `${spacer}dir ${dir}\n${temp}`;
      }
      let itemStr =
        node.items.length > 0 ? `${spacer}item ${node.items.join(`\n${spacer}item `)}\n` : ``;
      let temp2 = glob + itemStr;
      return temp2;
    };

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

    let outputString = 'root\n' + accessDirs(finalTree['root'], '  ');

    fs.writeFileSync('output.txt', `${outputString}`, function(err, data) {
      if (err) console.log(err);
      console.log('Successfully written to file');
    });

    console.log(outputString);
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
