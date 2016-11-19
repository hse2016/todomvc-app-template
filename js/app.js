(function (window) {
	'use strict';

	var Artemone = require('./Artemone/Artemone');
	var ListView = require('./Views/List-view');
	var AppView = require('./Views/App-view');
	var router = new Artemone.Router();


	var appView1 = new AppView();
	appView1.setElement('#first').render();

	var appView2 = new AppView();
	appView2.setElement('#second').render();


	var listView1 = new ListView();
	listView1.setName('todolist1').setElement('#first .todoapp').render();
	listView1.model.load();

	var listView2 = new ListView();
	listView2.setName('todolist2').setElement('#second .todoapp').render();
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
