/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');
var TodoView = require('./todo-view');
var Todos = require('./../Collections/todos');
var Todo = require('./../Models/todo');

class AppView extends Artemone.Views {

	constructor() {
		super();
		this.setModel(new Todos());
		this.render();
	}

	initialize() {
		this.list = document.getElementsByClassName('todo-list');
		this.footer = document.getElementsByClassName('footer');

		this.list[0].innerHTML = '';

		this.listenTo(this.model, 'change', this.render, this);
		this.listenTo(this.model, 'change', this.model.save.bind(this.model), this);
		this.listenTo(this.model, 'filter', this.filterAll, this);
		this.listenTo(this.model, 'filter', this.render, this);
		this.listenTo(this.model, 'add', this.renderModel, this);

		this.setTemplate('#stats-template');
	}

	events() {
		this.allCheckBox = document.getElementsByClassName('toggle-all')[0];
		this.clearCompletedLink = document.getElementsByClassName('clear-completed')[0];
		this.onClick(this, this.allCheckBox, '', this.toggleAllComplete);
		this.onClick(this, this.clearCompletedLink, '', this.clearCompleted);
		this.onKeyPress(this, '.new-todo', this.createOnEnter);

	}

	render() {

		var completed = this.model.models.length;
		var remaining = this.model.models.length;

		this.footer[0].innerHTML = this.template({
			completed: completed,
			remaining: remaining
		});


		if(this.el) {
			var links = this.el.querySelectorAll('.filters li a');
			[].forEach.call(links, function (el) {
				el.classList.remove("selected");
			});
			this.el.querySelector('[href="#/' + (Artemone.app.TodoFilter || '') + '"]').classList.add('selected');
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
		todo.emit('visible');
	}

	filterAll () {
		this.model.each(this.filterOne, this);
	}

	createOnEnter(e) {
		if (e.keyCode == 13) {
			var text = document.getElementsByClassName('new-todo')[0].value;
			document.getElementsByClassName('new-todo')[0].value = '';
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
}

module.exports = AppView;
