const Router = require('./../alexmvc/Router');
const Controller = require('./../alexmvc/Controller');

module.exports = class AppController extends Controller {
	onEditTextSubmitted(text) {
		this.model.createNewTask(text);
	}

	openPage() {
		super.openPage();
	}
};
