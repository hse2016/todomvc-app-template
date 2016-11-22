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
			let model = new AllModel(null);
			let controller = new AllController(router, model);

			let view = new AllView(window.document, controller, {
				"counter" : window.document.getElementById("todo-count"),
				"edittext" : window.document.getElementsByClassName("new-todo")[0]
			});

			model.bindView(view);
			controller.openPage();
		}
	});

	router.navigateTo("all");
})(window);


