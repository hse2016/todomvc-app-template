(function (window) {
	'use strict';

	var Artemone = require('./Artemone/Artemone');
	var AppView = require('./Views/app-view');
	var router = new Artemone.Router();


	var appView = new AppView();
	appView.setElement('.todoapp');
	appView.model.load();

	router
		.add(/completed/, function () {
			appView.setTodoFilter('completed');
			appView.model.emit('filter');
		})
		.add(/active/, function () {
			appView.setTodoFilter('active');
			appView.model.emit('filter');
		})
		.add(function () {
			appView.setTodoFilter('');
			appView.model.emit('filter');
		})
		.listen();

	router.navigate('/');

})(window);
