const Model = require('./../alexmvc/Model');

class TodoModel extends Model {
	constructor(api, todo) {
		super(api);
		this.todo = todo;
	}

	deleteItself() {
		this.api.removeTodo(this.todo.id);

		this.eventBus.sendEvent('wasDeleted', undefined);
	}
}

module.exports = TodoModel;
