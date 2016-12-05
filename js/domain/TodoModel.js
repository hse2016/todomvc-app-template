const Model = require('./../alexmvc/Model');

class TodoModel extends Model {
	constructor(api, taskText, state) {
		super(api);
		this.taskText = taskText;
		this.isChecked = state;
	}
}

module.exports = TodoModel;
