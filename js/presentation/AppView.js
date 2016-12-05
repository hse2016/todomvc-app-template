const View = require('./../alexmvc/View');
const TodoController = require('./TodoController');
const TodoView = require('./TodoView');

module.exports = class AppView extends View {
	constructor(document, controller) {
		const views = {
			counter: document.getElementById('todo-count'),
			edittext: document.getElementsByClassName('new-todo')[0],
			container: document.getElementsByClassName('todo-list')[0],
		};
		super(document, controller, views);
		super.setChildsContainer(this.container);

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
		eventBus.addEventHandler('counterUpdated', (value) => {
			self.counter.innerHTML = value.toString();
		});

		eventBus.addEventHandler('newTaskCreated', (task) => {
			let controller = new TodoController(null, task);
			new TodoView(self, controller);
		});
	}
};
