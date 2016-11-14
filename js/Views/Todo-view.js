/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');

class TodoView extends Artemone.Views {

	constructor() {
		super('li');
		this.setTemplate('#template-todo');
	}

	initialize() {
		if(this.model) {
			this.listenTo(this.model, 'visible', this.toggleVisible, this);
		}
	}

	events() {
		this.onClick(this, this.el, '.toggle', this.toggleCompleted);
		this.onClick(this, this.el, '.toggle', this.toggleVisible);
		this.onClick(this, this.el, '.destroy', this.destroy);
	}


	render() {
		this.el.innerHTML = this.template(this.model.attributes);
		this.checkCompleted();
		this.toggleVisible();
		this.events();
		return this;
	}

	destroy() {
		this.model.destroy();
	}

	toggleCompleted() {
		this.model.toggle();
	}

	checkCompleted() {
		if(this.model.get('completed')) {
			this.el.classList.add("completed");
		} else {
			this.el.classList.remove("completed");
		}
	}

	toggleVisible() {
		if(this.isHidden())
			this.el.classList.add('hidden');
		else
			this.el.classList.remove('hidden');
	}

	isHidden() {
		return this.model.get('completed') ? Artemone.app.TodoFilter === 'active' :
		Artemone.app.TodoFilter === 'completed';
	}
}

module.exports = TodoView;
