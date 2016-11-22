/**
 * Created by dalexiv on 11/21/16.
 */
const Model = require("./alexmvc/Model");

module.exports = class AllModel extends Model {

	bindView(view) {
		super.bindView(view);
		this.counter = 0;

	}

	createNewTask(text) {
		// call to localstorage and create new task

		++this.counter;
		this.eventBus.sendEvent('updateCounter', this.counter);
	}
};
