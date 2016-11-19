/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');
var TodoView = require('./todo-view');
var Todos = require('./../Collections/todos');
var Todo = require('./../Models/todo');

class ListView extends Artemone.Views {

	constructor() {
		super();
	}

	initialize() {
		this.setTemplate('#stats-template');

		this.listenTo(this.model, 'change', this.render, this);
		this.listenTo(this.model, 'change', this.model.save.bind(this.model), this);
		this.listenTo(this.model, 'change-model', this.model.save.bind(this.model), this);
		this.listenTo(this.model, 'filter', this.filterAll, this);
		this.listenTo(this.model, 'filter', this.render, this);
		this.listenTo(this.model, 'add', this.renderModel, this);

		// this.list[0].innerHTML = '';
	}

	events() {
		this.allCheckBox = this.el.getElementsByClassName('toggle-all')[0];
		this.clearCompletedLink = this.el.getElementsByClassName('clear-completed')[0];
		this.list = this.el.getElementsByClassName('todo-list');
		this.footer = this.el.getElementsByClassName('footer');

		this.onClick(this, this.allCheckBox, '', this.toggleAllComplete);
		this.onClick(this, this.clearCompletedLink, '', this.clearCompleted);
		this.onKeyPress(this, this.el, '.new-todo', this.createOnEnter);

		this.onClick(this, this.el, ".filters li a[href='#/completed']", this.showCompleted);
		this.onClick(this, this.el, ".filters li a[href='#/']", this.showAll);
		this.onClick(this, this.el, ".filters li a[href='#/active']", this.showActive);
	}

	render(text) {

		var completed = this.model.models.length;
		var remaining = this.model.models.length;

		this.el.getElementsByClassName('footer')[0].innerHTML = this.template({
			completed: completed,
			remaining: remaining
		});


		if(this.el) {
			var links = this.el.querySelectorAll('.filters li a');
			[].forEach.call(links, function (el) {
				el.classList.remove("selected");
			});
			this.el.querySelector('[href="#/' + (this.filter || '') + '"]').classList.add('selected');
		}

		this.events();

		return this;
	}

	renderModel(name, model) {
		var todoView = new TodoView();
		todoView.setModel(model);
		this.list[0].appendChild(todoView.render().el);
	}

	addOne(model) {
		this.model.add(model);
	}

	addAll(models) {
		this.list[0].innerHTML = '';
		for (var i in models) {
			this.addOne(models[i]);
		}

	}

	filterOne(todo) {
		todo.emit('visible', this.filter);
	}

	filterAll () {
		this.model.each(this.filterOne.bind(this), this);
	}

	createOnEnter(e) {
		if (e.keyCode == 13) {
			var text = this.el.getElementsByClassName('new-todo')[0].value;
			this.el.getElementsByClassName('new-todo')[0].value = '';
			var newTodo = new Todo({'title': text});
			this.addOne(newTodo);
		}
	}

	toggleAllComplete() {
		var completed = this.allCheckBox.checked;
		this.model.each(function (todo) {
			todo.set({
				completed: completed
			});
		});
	}

	clearCompleted() {
		var completed = this.model.completed()
		completed.forEach(function(item, i, arr) {
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
