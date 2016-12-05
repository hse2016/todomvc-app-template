/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../../Artemone/Artemone');
const CommentView = require('./../Comment/CommentView');
const Comment = require('./../Comment/Comment');

class CommentsView extends Artemone.Views {

	constructor() {
		super('div', '', '');

		this.dEvents = {
			'keypress .new-comment': this.createOnEnter,
		};

		this.dUI = {
			'comments' 		 : '.comments',
			'newComment' 	 : '.new-comment',
		};
	}

	initialize() {
		this.setTemplate('#comments-list-template');

		// this.listenTo(this.model, 'change', this.render, this);
		this.listenTo(this.model, 'add', this.renderModel, this);
	}

	events() {
		this.setUI();
		this.delegateEvents();
	}

	render() {
		this.el.innerHTML = this.template(this.model.attributes);
		this.events();

		for (const i in this.model.models) {
			this.renderModel('', this.model.models[i]);
		}
		return this;
	}

	renderModel(name, model) {
		const commentView = new CommentView();
		commentView.setModel(model);
		this.ui.comments.appendChild(commentView.render().el);
	}

	addOne(model) {
		this.model.add(model);
	}

	addAll(models) {
		this.ui.list.innerHTML = '';
		for (const i in models) {
			this.addOne(models[i]);
		}
	}

	createOnEnter(e) {
		if (e.keyCode === 13) {
			const text = this.ui.newComment.value;
			this.ui.newComment.value = '';
			const c = new Comment({ 'title': text });
			this.addOne(c);
		}
	}


	destroy() {
		this.model.destroy(this.id);
		this.model.unsave();
		this.el.remove();
	}
}

module.exports = CommentsView;
