const View = require('./../alexmvc/View');
class TodoView extends View {
	constructor(parent, controller) {
		TodoView.template = todomodel => {
			return super.html`<div class="view">
                                <input class="toggle" type="checkbox"
									${(todomodel.todo.isDone) ? "checked=true" : ""}>
                                <label class="text">${todomodel.todo.taskText}</label>
                                <button class="destroy"></button>
                            </div>
                            <input class="edit" value="Create a TodoMVC template">`;
		};

		TodoView.buildView = todomodel => {
			let html = TodoView.template(this.controller.model);
			let view = document.createElement("LI");
			view.innerHTML = html;

			if (todomodel.todo.isDone)
				view.className = "completed";

			return view;
		};
		super(parent, controller);

		let view = TodoView.buildView(this.controller.model);

		const views = {
			html: view,
			toggle: view.getElementsByClassName("toggle")[0],
			text: view.getElementsByClassName("text")[0],
			button: view.getElementsByClassName("destroy")[0],
			edit: view.getElementsByClassName("destroy")[0]
		};
		Object.assign(this, views);

		parent.getChildsContainer().appendChild(view);

		// Notify controller
		this.button.addEventListener("click", () => controller.onDeleteButtonClicked());
		this.toggle.addEventListener("click", () => controller.onToggleChanged())
	}

	setupListeners(eventBus) {
		let self = this;
		eventBus.addEventHandler('wasDeleted', nothing => {
			self.parent.getChildsContainer().removeChild(this.html);
		});
		eventBus.addEventHandler('stateChanged', state => {
			// this.toggle. to-do change toggle
		});

	}
}

module.exports = TodoView;
