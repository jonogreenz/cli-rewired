const qoa = require('qoa');
const spawn = require('cross-spawn');

const ps = [
  {
    type: 'input',
    query: 'Enter a command:',
    handle: 'name'
  },
];

const cli = async () => {
  const responses = await qoa.prompt(ps);

  const fullCommand = responses.name; // 'yarn -D add @types/testing';
  const [command, ...args] = fullCommand.split(' ');
  
  const p = spawn(command, args, { stdio: 'inherit' });
  p.on('error', i => console.error('cr failed for:', i.path)) // Report general failure
  // c.on('close', i => console.log('Stopping cr process')) // TODO: decide if needed
};

module.exports = cli;