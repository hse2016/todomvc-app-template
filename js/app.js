// require ('./Router');
// require ('./AllController');
// require ('./ActiveController');
// require ('./CompletedController');

class Router {
	constructor(window, pageMap) {
		this.window = window;
		this.pageMap = pageMap

		this.allController = new AllController(window);
		this.activeController = new ActiveController(window);
		this.completedController = new CompletedController(window);


		// Your starting point. Enjoy the ride!
		window.onpopstate = function (event) {
			var url = window.document.URL;
			var suffix = url.substring(url.lastIndexOf('/') + 1, url.length);

			navigateTo(suffix);
		};

	}

	navigateTo(route) {
		if (pageMap[suffix] instanceof AllController)
			allController.pageStart();
		else if (pageMap[suffix] instanceof ActiveController)
			activeController.pageStart();
		else if (pageMap[suffix] instanceof CompletedController)
			completedController.pageStart();
	}
}

(function (window) {
	'use strict';
	var router = new Router(window, {
		"": AllController,
		"completed": CompletedController,
		"active": ActiveController
	});
})(window);


