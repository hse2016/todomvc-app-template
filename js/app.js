(function (window) {
	'use strict';

	var Artemone = require('./Artemone/Artemone');
	var ListView = require('./Views/List-view');
	var AppView = require('./Views/App-view');
	var AppModel = require('./Models/App');
	var Todos = require('./Collections/Todos');
	var router = new Artemone.Router();


	var appModel = new AppModel({title : "aTodos"});

	var todosList1 = new Todos();
	var todosList2 = new Todos();

	var appView1 = new AppView();
	appView1.setModel(appModel).setElement('#first').render();

	var appView2 = new AppView();
	appView2.setModel(appModel).setElement('#second').render();


	var listView1 = new ListView();
	listView1.setModel(todosList1).setName('todolist1').setElement('#first .todoapp').render();
	if(listView1.model.load() == false) {
		listView1.render();
	}

	var listView2 = new ListView();
	listView2.setModel(todosList2).setName('todolist2').setElement('#second .todoapp').render();
	if(listView2.model.load() == false) {
		listView2.render();
	}


	router
		.add(/completed/, function () {
			// listView1.setTodoFilter('completed');
		})
		.add(/active/, function () {
			// listView1.setTodoFilter('active');
		})
		.add(function () {
			// listView1.setTodoFilter('');
		})
		.listen();

	router.navigate('/');

})(window);
