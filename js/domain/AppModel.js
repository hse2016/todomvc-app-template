const Model = require('./../alexmvc/Model');
const Todo = require('./../data/Todo');
const TodoModel = require('./TodoModel');

module.exports = class AppModel extends Model {
	constructor(api) {
		super(api);
	}

	bindView(view) {
		super.bindView(view);

		this.eventBus.sendEvent('counterUpdated', this.api.getAllTodos().size());

		// Inserting all that stuff
		let todos = this.api.getAllTodos().getTodos();
		for (let idx in todos) {
			this.eventBus.sendEvent('newTaskCreated',
				new TodoModel(this.api, this.eventBus, todos[idx]));
		}
	}

	createNewTask(text) {
		// call to localstorage and create new task
		let newTodo = new Todo(this.api.getUniqueId(), text, false);
		this.api.addTodo(newTodo);
		this.eventBus.sendEvent('newTaskCreated',
			new TodoModel(this.api, this.eventBus, newTodo));

		// update counter
		this.eventBus.sendEvent('counterUpdated', this.api.getAllTodos().size());
	}
};
