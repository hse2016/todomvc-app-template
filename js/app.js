const Router = require('./alexmvc/Router');
const AppController = require('./presentation/AppController');
const AppView = require('./presentation/AppView');
const AppModel = require('./domain/AppModel');
const TodoAPI = require('./data/TodoAPI');

(function (window) {
	const api = new TodoAPI(window.localStorage);

	const router = new Router(window, {
		all: '',
		completed: 'completed',
		active: 'active',
	}, {
		all() {
			const model = new AppModel(api);
			const controller = new AppController(router, model);

			const view = new AppView(window.document, controller);

			model.bindView(view);
			controller.openPage();
		},
	});

	router.navigateTo('all');
}(window));

