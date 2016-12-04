const Model = require('./../alexmvc/Model');
const Todo = require('./../data/Todo');

module.exports = class AppModel extends Model {
	constructor(api) {
		super(api);
	}

	bindView(view) {
		super.bindView(view);
		this.counter = 0;
	}

	createNewTask(text) {
		// call to localstorage and create new task

		++this.counter;
		this.eventBus.sendEvent('updateCounter', this.counter);
		this.api.addTodo(new Todo(text, false));
		console.log(this.api.getAllTodos());
	}
};
