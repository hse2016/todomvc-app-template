class Router {
	constructor(history, routes, actions) {
		this.history = history;
		this.routes = routes;
		this.actions = actions;
	}

	navigateTo(route) {
		this.actions[this.routes[route]]();
		this.history.pushState();
	}
}

module.exports = Router;
