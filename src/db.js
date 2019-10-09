const fs = require('fs');

const filePath = './db.json';

const getFromDb = () => {
	if (fs.existsSync(filePath)) {
		const read = fs.readFileSync(filePath, 'utf8');
		items = JSON.parse(read);
		return items;
	}
	return [];
}

const setToDb = (items) => {
	const write = JSON.stringify(items);
	fs.writeFileSync(filePath, write, 'utf8');
}

const formatDbItem = (command, alias) => {
	validateItem(alias);
	return {
		command,
		alias,
	}
}

const findDbItem = (items, alias) => {
	return items.find(i => i.alias === alias);
}

const addToDbItems = (items, item) => {
	const aliasExists = items.find(i => i.alias === item.alias);
	if (aliasExists) {
		throw Error('Alias already exists');
	}
	return [...items, item];
}

const removeFromDbItems = (items, item) => {
	return items.filter(i => i.alias !== item.alias);
}

const reservedCommands = ['a', 'e', 'd', 'ls']

const validateItem = (alias) => {
	if (reservedCommands.find(i => i === alias)) {
		throw new Error('Alias name is reserved for internal functionality');
	}
}

module.exports = {
	getFromDb,
	setToDb,
	formatDbItem,
	findDbItem,
	addToDbItems,
	removeFromDbItems
}