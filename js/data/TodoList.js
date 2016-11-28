/**
 * Created by User on 28/11/16.
 */
const Todo = require('./../data/Todo');

module.exports = class TodoList {
	constructor(type) {
		this.list = [];
		this.type = type;
	}

	push(todo) {
		this.list.push(todo);
	}
	static revive(json) {
		const list = new TodoList(json.type);
		for (const i in json.list) {
			list.push(Todo.revive(json.list[i]));
		}
		return list;
	}
};
