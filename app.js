const fs = require('fs');
const readline = require('readline');
const util = require('util');
const { syntaxParser, parser, outputWriter } = require('./helpers');
const services = require('./services');

function executeCommands(commands) {
  let structure = { root: { id: 'a', name: 'root', type: 'dir', components: [] } };
  for (let command of commands) {
    try {
      let context = services[command.type]({ structure, command });

      if (context) {
        structure = context.structure;
      } else {
        return { passed: false, op: command };
      }
    } catch (e) {
      return { passed: false, op: command };
    }
  }

  return { passed: true, op: structure };
}

/**
 */
function readInputFile() {
  let commands = [];
  const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt')
  });

  lineReader.on('line', function(line) {
    let analyzedResult = syntaxParser(line);
    if (analyzedResult) {
      let commandObject = parser(line);
      if (commandObject) {
        commands.push(commandObject);
      } else {
        lineReader.emit('parse_error', line);
        lineReader.close();
      }
    } else {
      lineReader.emit('syntax_error', line);
      lineReader.close();
    }
  });

  lineReader.on('syntax_error', function(line) {
    console.log('Invalid Syntax:', line);
  });

  lineReader.on('parser_error', function(line) {
    console.log('Unable to Parse:', line);
  });

  lineReader.on('close', function() {
    let output = executeCommands(commands);
    outputWriter(output.passed, output.op);
  });
}

function main() {
  try {
    readInputFile();
  } catch (error) {
    console.log(error);
  }
}

main();
