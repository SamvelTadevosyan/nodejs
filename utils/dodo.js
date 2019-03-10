const program = require('commander');
const commands = require('./commands');

let commandsIterable = [
  'reverse',
  'transform',
  'outputFile',
  'convertFromFile​​',
  'convertToFile',
];

program
  .description('execute the given remote cmd')
  .option("-a, --action <act>", "Write an action that will run thw program(must have value!)")
  .option("-f, --file <file>", "File with what program will work(must have value!)")
  .action(function(cmd, options){

  })
  .parse(process.argv);

if (program.action) {
  commandsIterable.map((command) => {
    if (command === program.action) {
      if(command === 'reverse' || command === 'transform') {
        commands[command](program.args[0]);
      } else {
        commands[command](program.file);
      }
    }
  });
} else if (program.args.length === 2) {
  program.help();
}
