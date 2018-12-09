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
      let temp = '';
      for (let dir of node.dirs) {
        temp = accessDirs(finalTree[dir], `${spacer}  `);
      }
      let dirStr =
        node.dirs.length > 0 ? `${spacer}dir ${node.dirs.join(`\n${spacer}dir `)}\n` : ``;
      let itemStr =
        node.items.length > 0 ? `${spacer}item ${node.items.join(`\n${spacer}item `)}\n` : ``;
      return dirStr + temp + itemStr;
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
