const Router = require('./alexmvc/Router');
const AllController = require('./presentation/AllController');
const AllView = require('./presentation/AllView');
const AllModel = require('./domain/AllModel');
const TodoAPI = require('./data/TodoAPI');

(function (window) {
	const api = new TodoAPI(window.localStorage);

	const router = new Router(window, {
		all: '',
		completed: 'completed',
		active: 'active',
	}, {
		all() {
			const model = new AllModel(api);
			const controller = new AllController(router, model);

			const view = new AllView(window.document, controller);

			model.bindView(view);
			controller.openPage();
		},
	});

	router.navigateTo('all');
}(window));

