const Model = require('./../alexmvc/Model');

class TodoModel extends Model {
	constructor(api, parentListener, todo) {
		super(api);
		this.parentListener = parentListener;
		this.todo = todo;
	}

	deleteItself() {
		this.api.removeTodo(this.todo.id);

		this.eventBus.sendEvent('wasDeleted', undefined);
		this.parentListener.sendEvent('counterUpdated', this.api.getAllTodos().size());
	}

	changeState() {
		this.todo.changeState();

		this.eventBus.sendEvent('stateChanged', this.todo.isDone);
	}
}

module.exports = TodoModel;
