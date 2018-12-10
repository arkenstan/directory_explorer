const fs = require('fs');
const readline = require('readline');
const { syntaxParser, parser, outputWriter } = require('./helpers');
const services = require('./services');

/**
 * Function will start to execute commands one by one
 * @param {*} commands list of commands
 */
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
    if (!structure['root']) {
      structure = { root: { id: 'a', name: 'root', type: 'dir', components: [] } };
    }
  }

  return { passed: true, op: structure };
}

/**
 * Function creates a line from readStream
 * and apply syntax and grammar parsing to
 * the command
 */
function readInputFile() {
  let commands = [],
    error = false;
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
      }
    } else {
      lineReader.emit('syntax_error', line);
    }
  });

  lineReader.on('syntax_error', function(line) {
    error = true;
    console.log('Invalid Syntax:', line);
    outputWriter(false, { cmd: line });
  });

  lineReader.on('parser_error', function(line) {
    error = true;
    console.log('Unable to Parse:', line);
    outputWriter(false, { cmd: line });
  });

  lineReader.on('close', function(dangle) {
    if (!error) {
      let output = executeCommands(commands);
      outputWriter(output.passed, output.op);
    }
  });
}

/**
 * Function to manage application
 */
function main() {
  try {
    readInputFile();
  } catch (error) {
    console.log(error);
  }
}

main();
