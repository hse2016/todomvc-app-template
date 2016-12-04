/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../Artemone/Artemone');

class CommentView extends Artemone.Views {

	constructor() {
		super('li');
		this.setTemplate('#comment-template');
	}

	initialize() {
		if (this.model) {
			this.listenTo(this.model, 'change', this.render, this);
		}
	}

	events() {
		this.delegateEvents();
	}


	render() {
		this.el.innerHTML = this.template(this.model.attributes);
		// this.events();
		return this;
	}


	destroy() {
		this.model.destroy();
	}
}

module.exports = CommentView;
