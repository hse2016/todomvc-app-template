/**
 * Created by dalexiv on 11/21/16.
 */
const View = require('./../alexmvc/View');

module.exports = class AllView extends View {
	constructor(document, controller) {
		const views = {
			counter: document.getElementById('todo-count'),
			edittext: document.getElementsByClassName('new-todo')[0],
		};

		super(document, controller, views);
		Object.assign(this, views);

		this.edittext.addEventListener('keypress', function (event) {
			const key = event.which || event.keyCode;
			if (key === 13) {
				controller.onEditTextSubmitted(this.value);
			}
		});
	}

	setupListeners(eventBus) {
		// setup model to view callbacks
		const self = this;
		eventBus.addEventHandler('updateCounter', (value) => {
			self.counter.innerHTML = value.toString();
		});
	}
};
