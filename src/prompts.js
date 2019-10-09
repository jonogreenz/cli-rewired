const db = require('./db');

const add = [
	{
		type: 'input',
		query: 'Enter your new command:',
		handle: 'command'
	},
	{
		type: 'input',
		query: 'Enter an alias name:',
		handle: 'alias'
	},
];

const handleAdd = (responses) => {
	const existingItems = db.getFromDb();
	const newItem = db.formatDbItem(responses.command, responses.alias);
	const items = db.addToDbItems(existingItems, newItem);
	db.setToDb(items);
}

const edit1 = [
	{
		type: 'input',
		query: 'Enter your updated command:',
		handle: 'command',
	},
	{
		type: 'confirm',
		query: 'Do you want to update your alias?',
		handle: 'update',
		accept: 'y',
		deny: 'n'
	},
]

const handleEdit1 = (responses, cmdAlias) => {
	const existingItems = db.getFromDb();
	const currentItem = db.findDbItem(existingItems, cmdAlias);
	if (currentItem) {
		currentItem.command = responses.command;
		if (!responses.update) {
			const newItems = db.removeFromDbItems(existingItems, currentItem);
			const items = db.addToDbItems(newItems, currentItem);
			db.setToDb(items);
		}
		return currentItem;
	}
	return false;
}

const edit2 = [
	{
		type: 'input',
		query: 'Enter your updated alias name:',
		handle: 'alias',
	}
];

const handleEdit2 = (responses, cmdAlias, editItem) => {
	if (editItem) {
		const existingItems = db.getFromDb(); // TODO: maintain context between commands
		const newItems = db.removeFromDbItems(existingItems, editItem);
		editItem.alias = responses.alias;
		const items = db.addToDbItems(newItems, editItem);
		db.setToDb(items);
	}
}

const remove = [
	{
		type: 'confirm',
		query: 'Are you sure you want to remove this alias?',
		handle: 'remove',
		accept: 'Y',
		deny: 'n'
	}
]


module.exports = {
	add,
	handleAdd,
	edit1,
	handleEdit1,
	edit2,
	handleEdit2,
	remove,
};