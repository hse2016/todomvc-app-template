'use strict';
let Controller = require('../mvc/smvc').Controller;
let Todo = require('../models/todo');

class TodoController extends Controller {
	constructor(todo){
		if (todo instanceof Todo) {
			super(todo);
		} else {
			throw new Error('Wrong parameter type');
		}

		this.on('toggleStatus', () => {
			this.model.toggleStatus();
		})

	}
}

module.exports = TodoController;
