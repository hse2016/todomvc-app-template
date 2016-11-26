/**
 * Created by tema on 19.11.16.
 */

const Artemone = require('./../Artemone/Artemone');

class AppView extends Artemone.Views {
	constructor(_id) {
		super('div', '', _id);
	}

	initialize() {
		this.setTemplate('#todoapp');
		this.listenTo(this.model, 'add', this.render, this);
	}

	render(e, model) {
		const div = document.createElement('div');
		div.innerHTML = this.template(model.attributes);
		this.el.insertBefore(div, this.el.firstChild);
	}

}

module.exports = AppView;
