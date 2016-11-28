/**
 * Created by dalexiv on 11/21/16.
 */
const Model = require('./../alexmvc/Model');
const Todo = require('./../data/Todo');

module.exports = class AppModel extends Model {
	constructor(api) {
		super(api);
		api.addTodo(new Todo('hey, bitmaker!', true));
	}

	bindView(view) {
		super.bindView(view);
		this.counter = 0;
	}

	createNewTask(text) {
		// call to localstorage and create new task

		++this.counter;
		this.eventBus.sendEvent('updateCounter', this.counter);
		console.log(this.api.getAllTodos());
	}
};
