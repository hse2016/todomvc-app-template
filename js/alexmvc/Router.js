module.exports = class Router {
	constructor(window, routes, actions) {
		this.window = window;
		this.routes = routes;
		this.actions = actions;
	}

	navigateTo(route) {
		this.actions[route]();
		this.window.history.pushState(route, 'title', `#${this.routes[route]}`);
	}
};
