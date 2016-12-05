/**
 * Created by tema on 19.11.16.
 */

const Artemone = require('./../../Artemone/Artemone');

class AppView extends Artemone.Views {
	constructor(_id) {
		super('div', '', _id);
	}

	initialize() {
		this.setTemplate('#todoapp');
		this.listenTo(this.model, 'add', this.render, this);
		this.listenTo(this.model, 'loaded', this.loadTodos, this);
		this.listenTo(this.model, 'loading-error', this.initTodo, this);
	}

	render(e, model) {
		const div = document.createElement('div');
		div.innerHTML = this.template(model.attributes);
		this.el.insertBefore(div, this.el.firstChild);
	}

	loadTodos(event, model) {
		model.loadTodos();
	}

	initTodo(event, error) {
		const appModel = new AppModel({ title: 'Todos' });
		this.model.add(appModel);
		console.log(error);
	}

}

module.exports = AppView;
