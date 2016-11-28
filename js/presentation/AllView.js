/**
 * Created by dalexiv on 11/21/16.
 */
const View = require('./../alexmvc/View');

module.exports = class AllView extends View {
	constructor(document, controller) {
		var views = {
			counter: window.document.getElementById('todo-count'),
			edittext: window.document.getElementsByClassName('new-todo')[0],
		};

		super(document, controller, views);
		Object.assign(this, views);

		this.edittext.addEventListener('keypress', function (event) {
			const key = event.which || event.keyCode;
			if (key == 13) {
				console.log(this);
				controller.onEditTextSubmitted(this.value);
			}
		});
	}

	setupListeners(eventBus) {
		// setup model to view callbacks
		var self = this;
		eventBus.addEventHandler('updateCounter', function (value) {
			self.counter.innerHTML = value.toString();
		});
	}
};
