(function (window) {
	'use strict';

	var Artemone = require('./Artemone/Artemone');
	var Todo = require('./Models/todo');
	var TodoView = require('./Views/todo-view');
	var AppView = require('./Views/app-view');
	var EventManager = new Artemone.Events();



	var todo1 = new Todo({'title' : 'Artem'});
	var todo2 = new Todo({'title' : 'Temka'});
	var todo3 = new Todo({'title' : 'Temo4ka'});
	var appView = new AppView();

	appView.addAll([todo1,todo2,todo3]);

})(window);
