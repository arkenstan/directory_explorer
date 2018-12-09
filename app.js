const fs = require('fs');
const readline = require('readline');
const util = require('util');
const { analyzer, commandParser } = require('./helpers');
const { createService, deleteService, moveService } = require('./services');

// let structure = [{ name: 'root', type: 'dir', components: [] }];
let structure = { root: { type: 'dir', item: [], dir: [] } };
// let commands = [];

function executeCommands(commands) {
  for (let command of commands) {
    let context = { structure, command };
    switch (command.type) {
      case 'create':
        context = createService(context);
        structure = context.structure;
        break;
      case 'delete':
        context = deleteService(context);
        structure = context.structure;
        break;
      case 'move':
        context = moveService(context);
        structure = context.structure;
        break;
      default:
        break;
    }
  }

  console.log(util.inspect(structure, false, null, true));

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
    let analyzedResult = analyzer(line);
    if (!analyzedResult) {
      lineReader.emit('analyzer_error', line);
      lineReader.close();
    } else {
      let commandObject = commandParser(line);
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
