const qoa = require('qoa');

const {log} = console;

const ps = [
  {
    type: 'input',
    query: 'Name your command:',
    handle: 'name'
  },
];

const cli = () => {
	qoa.prompt(ps).then(log);
};

module.exports = cli;