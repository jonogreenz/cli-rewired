const qoa = require('qoa');
const spawn = require('cross-spawn');
const yargs = require('yargs');

const addPrompt = [
  {
    type: 'input',
    query: 'Enter your full command:',
    handle: 'command'
  },
  {
    type: 'input',
    query: 'Enter an alias name:',
    handle: 'alias'
  },
];

/**
 * Terminology:
 * cmdAlias == The name given to a rewired command in order to allow for execution
 * Original command == The input commands which the user is trying to alias
 * Rewired command == The stored alias commands that the program will allow creation of
 */

const cli = async () => {
  // https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
  const argv = yargs.usage(
    '$0 <cmd>',
  )
  .command(
    'a',
    'Add a rewired command',
    y => y.positional('a', {
      describe: 'Add a new rewired command',
      type: 'string',
    })
  )
  .command(
    'd <cmdAlias>',
    'Delete a rewired command',
    y => y.positional('d', {
      describe: 'Delete a rewired command with given cmdAlias',
      type: 'string',
    }).requiresArg('cmdAlias')
  )
  .command(
    'e <cmdAlias>',
    'Edit a rewired command',
    y => y.positional('e', {
      describe: 'Edit a rewired command with given cmdAlias',
      type: 'string',
    }).requiresArg('cmdAlias')
  )
  .command(
    'l',
    'List all rewired commands',
    y => y.positional('l', {
      describe: 'List all stored rewired commands',
      type: 'string',
    })
  )
  .command(
    '<cmdAlias>', 
    'Run your rewired command from a given alias', 
    y => y.positional('cmdAlias', {
      describe: 'Runs the rewired command with aliased name',
      type: 'string',
    })
  )
  .demandCommand(
    1, 
    1, 
    'You need to provide a rewired command alias, or an internal command', 
    'A maximum of one command can be provided at a time') // FIXME:
  .help()
  .argv;
  
  switch (argv._[0]) {
    case ('a'): {
      const responses = await qoa.prompt(addPrompt);
      break;
    }
    case ('e'): {
      const cmdAlias = argv.cmdAlias;
      console.log(cmdAlias);
      // const responses = await qoa.prompt(addPrompt);
      break;
    }
    case ('d'): {
      const cmdAlias = argv.cmdAlias;
      console.log(cmdAlias);
      // const responses = await qoa.prompt(addPrompt);
      break;
    }
    case ('l'): {
      break;
    }
    default: {
      const cmdAlias = argv._[0];
      console.log(cmdAlias);
    }
  }

  


  // const fullCommand = responses.name; // 'yarn -D add @types/testing';
  // const [command, ...args] = fullCommand.split(' ');
  
  // const p = spawn(command, args, { stdio: 'inherit' });
  // p.on('error', i => console.error('cr failed for:', i.path)) // Report general failure
  // c.on('close', i => console.log('Stopping cr process')) // TODO: decide if needed
};

module.exports = cli;