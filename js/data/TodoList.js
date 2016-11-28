/**
 * Created by User on 28/11/16.
 */
module.exports = class TodoList {
	constructor(type) {
		this.list = [];
		this.type = type;
	}

	add(todo) {
		this.list.add(todo);
	}
};
