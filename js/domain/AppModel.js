const Model = require('./../alexmvc/Model');
const Todo = require('./../data/Todo');
const TodoModel = require('./TodoModel');
module.exports = class AppModel extends Model {
	constructor(api) {
		super(api);
		this.counter = api.getAllTodos().length;
	}

	bindView(view) {
		super.bindView(view);

	}

	createNewTask(text) {
		// call to localstorage and create new task

		++this.counter;
		this.eventBus.sendEvent('counterUpdated', this.counter);
		this.eventBus.sendEvent('newTaskCreated', new TodoModel(this.api, text, false));
		this.api.addTodo(new Todo(text, false));
		console.log(this.api.getAllTodos());
	}
};
