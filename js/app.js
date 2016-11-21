// require ('./Router');
// require ('./AllController');
// require ('./ActiveController');
// require ('./CompletedController');
const Router = require("./alexmvc/Router");
const AllController = require("./AllController");
(function (window) {
	'use strict';
	let router = new Router(window, {
		"all": "",
		"completed": "completed",
		"active": "active"
	}, {
		"all" : function () {
			new AllController(router).openPage();
		}
	});

	router.navigateTo("all");
})(window);
