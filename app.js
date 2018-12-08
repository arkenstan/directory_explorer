const fs = require('fs');
const readline = require('readline');
const generalHelpers = require('./helpers/helpers');

// let structure = [{ name: 'root', type: 'dir', components: [] }];
let structure = { root: { type: 'dir', components: [] } };
// let commands = [];

function executeCommands(commands) {
  for (let command in commands) {
    switch (command.type) {
      case 'create':
        break;
      case 'delete':
        break;
      case 'move':
        break;
      default:
        break;
    }
  }
  console.log(commands);
  return 'commands';
}
/**
 */
function readInputFile() {
  let commands = [];
  const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt')
  });

  lineReader.on('line', function(line) {
    let analyzedResult = generalHelpers.analyze(line);
    if (!analyzedResult) {
      lineReader.emit('analyzer_error', line);
      lineReader.close();
    } else {
      let commandObject = generalHelpers.commandParser(line);
      if (commandObject) {
        commands.push(commandObject);
      } else {
        lineReader.emit('analyzer_error', line);
        lineReader.close();
      }
    }
  });

  lineReader.on('analyzer_error', function(line) {
    console.log('INVALID COMMAND:', line);
  });

  lineReader.on('close', function() {
    console.log(executeCommands(commands));
  });
}

function main() {
  readInputFile();
}

main();
