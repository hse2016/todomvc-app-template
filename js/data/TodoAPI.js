/**
 * Created by User on 28/11/16.
 */
const TodoList = require('./../data/TodoList');

module.exports = class TodoAPI {

	constructor(provider) {
		this.provider = provider;

		this.storageKey = 'data';
		if (this.provider.getItem(this.storageKey) == null) {
			this.saveData(this.storageKey, new TodoList(null));
		}
	}

	addTodo(todo) {
		this.updateDB((list) => { list.push(todo); });
	}

	getAllTodos() {
		return this.readFromDB(list => list);
	}

	readFromDB(func) {
		const list = this.getList(this.storageKey);
		return func(list);
	}

	updateDB(func) {
		const list = this.getList(this.storageKey);
		console.log(list);
		func(list);
		this.saveData(this.storageKey, list);
	}

	saveData(key, list) {
		this.provider.setItem(key, JSON.stringify(list));
	}

	getList(key) {
		return TodoList.revive(this.getData(key));
	}

	getData(key) {
		return JSON.parse(this.provider.getItem(key));
	}
};
