// require ('./Router');
// require ('./AllController');
// require ('./ActiveController');
// require ('./CompletedController');
const Router = require("./alexmvc/Router");
const AllController = require("./AllController");
const AllView = require("./AllView");
const AllModel = require("./AllModel");
(function (window) {
	'use strict';

	let router = new Router(window, {
		"all": "",
		"completed": "completed",
		"active": "active"
	}, {
		"all" : function () {
			new AllController(router,
				new AllView(window.document, {
					"counter" : window.document.getElementById("todo-count").innerHTML
				}), new AllModel()).openPage();
		}
	});
	console.log("hey");

	router.navigateTo("all");
})(window);


