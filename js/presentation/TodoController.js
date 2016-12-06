/**
 * Created by dalexiv on 12/5/16.
 */
const Controller = require('./../alexmvc/Controller');
class TodoController extends Controller {
	onDeleteButtonClicked() {
		this.model.deleteItself();
	}

	onToggleChanged() {
		this.model.changeState();
	}

	openPage() {
		super.openPage();
	}
}
module.exports = TodoController;
