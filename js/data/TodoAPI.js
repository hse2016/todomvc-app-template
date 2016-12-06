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
		this.updateDB((list) => {
			list.push(todo);
			return list;
		});
	}

	removeTodo(id) {
		this.updateDB((list) => {
			let updatedTodos = list.getTodos().filter(item => item.id !== id);
			list.setTodos(updatedTodos);
			return list;
		})
	}

	changeTodoState(id, state) {
		this.updateDB((list) => {
			let todo = this.getTodoById().getTodoById(id, list);
			todo.isDone = state;
			return list;
		})
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
		let updatedList = func(list);
		console.log(updatedList);
		this.saveData(this.storageKey, updatedList);
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

	getTodoById(id, todolist) {
		let todos = todolist;

		for (let idx in todos)
			if (todos[idx].id == id)
				return todos[idx];
	}

	getUniqueId() {
		let id = 0;
		let todos = this.getAllTodos().getTodos();

		for (let idx in todos)
			if (todos[idx].id > id)
				id = todos[idx].id;

		return id + 1;
	}
};
