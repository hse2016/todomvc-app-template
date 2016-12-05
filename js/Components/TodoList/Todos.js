/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../../Artemone/Artemone');
const Todo = require('./../Todo/Todo');
const LocalStorage = require('./../../Artemone/LocalStorage');

class Todos extends Artemone.Collection {

	constructor() {
		super();
		this.initialize();
		this.name = 'Todos';
		this.storage = new LocalStorage();
	}

	initialize() {
		this.listenTo(this, 'change', this.save, this);
		this.model = Todo;
	}

	toggleAllComplete(completed) {
		this.each((todo) => {
			todo.setCompleted(completed);
		});
	}

	completed() {
		return this.where({ completed: true });
	}

	remaining() {
		return this.where({ completed: false });
	}

	destroy(id) {
		this.emit('destroy', id);
	}

}

module.exports = Todos;
