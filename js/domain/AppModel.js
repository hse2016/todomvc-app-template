const Model = require('./../alexmvc/Model');
const Todo = require('./../data/Todo');
const TodoModel = require('./TodoModel');

module.exports = class AppModel extends Model {
	constructor(api) {
		super(api);
		this.counter = this.api.getAllTodos().size();
	}

	bindView(view) {
		super.bindView(view);

		this.eventBus.sendEvent('counterUpdated', this.counter);

		// Inserting all that stuff
		let todos = this.api.getAllTodos().todos();
		for (let idx in todos) {
			this.eventBus.sendEvent('newTaskCreated',
				new TodoModel(this.api, todos[idx]));
		}
	}

	createNewTask(text) {
		// call to localstorage and create new task
		++this.counter;
		this.eventBus.sendEvent('counterUpdated', this.counter);

		let newTodo = new Todo(this.api.getUniqueId(), text, false);
		this.eventBus.sendEvent('newTaskCreated',
			new TodoModel(this.api, newTodo));
		this.api.addTodo(newTodo);
	}
};
