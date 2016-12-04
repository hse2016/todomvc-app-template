/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../Artemone/Artemone');
const CommentsListView = require('./../Views/CommentList-view');

class TodoView extends Artemone.Views {

	constructor() {
		super('li');
		this.setTemplate('#template-todo');

		this.dEvents = {
			'click .toggle ': this.toggleCompleted,
			'click .toggle': this.toggleVisible,
			'click .destroy': this.destroy,
			'keypress .new-comment': this.addComment,
		};

		this.dUI = {
			'comments' 		 : '.comments-wrapper',
		};
	}

	initialize() {
		if (this.model) {
			this.listenTo(this.model, 'visible', this.toggleVisible, this);
			this.listenTo(this.model, 'change', this.render, this);
			this.listenTo(this.model.comments, 'loaded', this.render, this);

			this.comments = new CommentsListView();
			this.comments.setModel(this.model.comments).render();
		}
	}

	events() {
		this.delegateEvents();
		this.setUI();
	}

	render() {
		this.el.innerHTML = this.template(this.model.attributes);
		this.checkCompleted();
		this.toggleVisible();
		this.events();

		this.ui.comments.appendChild(this.comments.el);
		return this;
	}

	destroy() {
		this.model.destroy();
	}

	toggleCompleted() {
		this.model.toggle();
	}

	checkCompleted() {
		if (this.model.get('completed')) {
			this.el.classList.add('completed');
		} else {
			this.el.classList.remove('completed');
		}
	}

	toggleVisible(event, filter) {
		if (this.isHidden(filter)) {
			this.el.classList.add('hidden');
		} else {
			this.el.classList.remove('hidden');
		}
	}

	isHidden(filter) {
		filter = filter || '';
		return this.model.get('completed') ? filter === 'active' :
		filter === 'completed';
	}
}

module.exports = TodoView;
