'use strict';
let View = require('../mvc/smvc').View;
let Todo = require('../models/todo');
let TodoController = require('../controllers/todoController');

class TodoView extends View {
	constructor(htmlItem, todoController, todo) {
		if (todoController instanceof TodoController &&
			todo instanceof Todo) {
			super(htmlItem, todoController, todo);
		} else {
			throw new Error('Wrong parameters types.');
		}
	}


}

module.exports = TodoView;
