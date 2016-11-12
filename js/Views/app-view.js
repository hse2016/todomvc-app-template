/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');
var TodoView = require('./todo-view');
var Todos = require('./../Collections/todos');
var Todo = require('./../Models/todo');
var _ = require('underscore');

class AppView extends Artemone.Views {

	constructor() {
		super();

		this.initialize();
	}

	initialize() {
		this.setModel(new Todos());
		this.list = document.getElementsByClassName('todo-list');
		this.footer = document.getElementsByClassName('footer');
		//this.listenTo(this.model, 'add', this.addOne, this);
		this.listenTo(this.model, 'add', this.render, this);

		this.onKeyPress(this, '.new-todo', this.createOnEnter);

		this.setTemplate('#stats-template');
	}

	render() {

		var completed = this.model.models.length;
		var remaining = this.model.models.length;

		this.footer[0].innerHTML = this.template({
			completed: completed,
			remaining: remaining
		});

		return this;
	}

	addOne(model) {
		var todoView = new TodoView();
		todoView.setModel(model);
		this.model.add(model);
		this.list[0].appendChild(todoView.render().el);
	}

	addAll(models) {
		this.list[0].innerHTML = '';
		for(var i in models) {
			this.addOne(models[i]);
		}

	}

	createOnEnter(e) {
		if (e.keyCode == 13) {
			var text = document.getElementsByClassName('new-todo')[0].value;
			document.getElementsByClassName('new-todo')[0].value = '';
			var newTodo = new Todo({'title' : text});
			this.addOne(newTodo);
		}
	}
}

module.exports = AppView;
