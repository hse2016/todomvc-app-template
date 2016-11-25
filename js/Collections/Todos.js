/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../Artemone/Artemone');
const Todo = require('./../Models/todo');
const LocalStorage = require('./../Artemone/LocalStorage');

class Todos extends Artemone.Collection {

	constructor() {
		super();
		this.initialize();
		this.name = 'Todos';
		this.storage = new LocalStorage();
	}

	initialize() {
		this.model = Todo;
	}

	completed() {
		return this.where({ completed: true });
	}

	remaining() {
		return this.where({ completed: false });
	}

}

module.exports = Todos;
