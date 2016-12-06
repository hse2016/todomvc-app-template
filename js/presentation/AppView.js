const View = require('./../alexmvc/View');
const TodoController = require('./TodoController');
const TodoView = require('./TodoView');

class AppView extends View {
	constructor(parent, controller) {
		const views = {
			counter: parent.getElementById('todo-count'),
			edittext: parent.getElementsByClassName('new-todo')[0],
			container: parent.getElementsByClassName('todo-list')[0],
		};
		super(parent, controller, views);
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

		eventBus.addEventHandler('newTaskCreated', (taskModel) => {
			let controller = new TodoController(null, taskModel);
			let view = new TodoView(self, controller);
			taskModel.bindView(view);
		});
	}
};

module.exports = AppView;
