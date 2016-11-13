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
			Artemone.app.TodoFilter = 'completed';
			console.log(Artemone.app.TodoFilter);
			appView.model.emit('filter');
		})
		.add(/active/, function () {
			Artemone.app.TodoFilter = 'active';
			console.log(Artemone.app.TodoFilter);
			appView.model.emit('filter');
		})
		.add(function () {
			Artemone.app.TodoFilter = '';
			console.log(Artemone.app.TodoFilter);
			appView.model.emit('filter');
		})
		.listen();

	router.navigate('/');

})(window);
