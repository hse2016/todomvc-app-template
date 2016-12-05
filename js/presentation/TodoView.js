const View = require('./../alexmvc/View');
class TodoView extends View {
	constructor(parent, controller) {
		TodoView.template = todomodel => {
			return super.html`<div class="view">
                                <input class="toggle" type="checkbox"
									${(todomodel.isChecked) ? "checked=true" : ""}>
                                <label class="text">${todomodel.taskText}</label>
                                <button class="destroy"></button>
                            </div>
                            <input class="edit" value="Create a TodoMVC template">`;
		};

		TodoView.buildView = todomodel => {
			let html = TodoView.template(this.controller.model);
			let view = document.createElement("LI");
			view.innerHTML = html;

			if (todomodel.isChecked)
				view.className = "completed";

			return view;
		};
		super(parent, controller);

		let view = TodoView.buildView(this.controller.model);

		const views = {
			toggle: view.getElementsByClassName("toggle")[0],
			text: view.getElementsByClassName("text")[0],
			button: view.getElementsByClassName("destroy")[0],
			edit: view.getElementsByClassName("destroy")[0]
		};
		Object.assign(this, views);

		parent.getChildsContainer().appendChild(view);
	}

	setupListeners(eventBus) {

	}
}

module.exports = TodoView;
