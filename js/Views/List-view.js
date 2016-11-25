/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../Artemone/Artemone');
const TodoView = require('./todo-view');
const Todo = require('./../Models/todo');

class ListView extends Artemone.Views {

	constructor() {
		super();

		this.dEvents = {
			'click .toggle-all': this.toggleAllComplete,
			'click .clear-completed': this.clearCompleted,
			'keypress .new-todo': this.createOnEnter,
		};

		this.dUI = {
			'allCheckBox' 		 : '.toggle-all',
			'clearCompletedLink' : '.clear-completed',
			'list' 				 : '.todo-list',
			'footer' 			 : '.footer',
		};
	}

	initialize() {
		this.setTemplate('#stats-template');

		this.listenTo(this.model, 'change', this.render, this);
		this.listenTo(this.model, 'change-model', this.render, this);
		this.listenTo(this.model, 'change-model', this.model.save, this.model);
		this.listenTo(this.model, 'filter', this.filterAll, this);
		this.listenTo(this.model, 'filter', this.render, this);
		this.listenTo(this.model, 'add', this.renderModel, this);
	}

	events() {
		this.setUI();
		this.delegateEvents();
	}

	render() {
		const completed = this.model.completed().length;
		const remaining = this.model.remaining().length;

		if (this.ui.footer) {
			this.ui.footer.innerHTML = this.template({
				completed: completed,
				remaining: remaining,
			});
		}


		if (this.el) {
			const links = this.el.querySelectorAll('.filters li a');
			[].forEach.call(links, (el) => {
				el.classList.remove('selected');
			});
			this.el.querySelector(`[href="#/${this.filter || ''}"]`).classList.add('selected');
		}

		if (this.ui.allCheckBox) {
			this.ui.allCheckBox.checked = !remaining;
		}


		this.onClick(this, this.el, ".filters li a[href='#/completed']", this.showCompleted);
		this.onClick(this, this.el, ".filters li a[href='#/']", this.showAll);
		this.onClick(this, this.el, ".filters li a[href='#/active']", this.showActive);


		this.updateEvent('click .clear-completed');

		return this;
	}

	renderModel(name, model) {
		const todoView = new TodoView();
		todoView.setModel(model);
		this.ui.list.appendChild(todoView.render().el);
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

	filterOne(todo) {
		todo.emit('visible', this.filter);
	}

	filterAll() {
		this.model.each(this.filterOne.bind(this), this);
	}

	createOnEnter(e) {
		if (e.keyCode === 13) {
			const text = this.el.getElementsByClassName('new-todo')[0].value;
			this.el.getElementsByClassName('new-todo')[0].value = '';
			const newTodo = new Todo({ 'title': text });
			this.addOne(newTodo);
		}
	}

	toggleAllComplete() {
		const completed = this.ui.allCheckBox.checked;
		this.model.each((todo) => {
			todo.set({
				completed: completed,
			});
		});
	}

	clearCompleted() {
		const completed = this.model.completed();
		completed.forEach((item) => {
			item.destroy();
		});
		return false;
	}

	showAll() {
		this.setTodoFilter('');
	}

	showCompleted() {
		this.setTodoFilter('completed');
	}

	showActive() {
		this.setTodoFilter('active');
	}

	setTodoFilter(filter) {
		this.filter = filter;
		this.model.emit('filter');
	}
}

module.exports = ListView;
