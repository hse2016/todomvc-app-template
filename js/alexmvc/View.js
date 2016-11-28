/**
 * Created by dalexiv on 11/21/16.
 */
module.exports = class View {
	constructor(document, controller, views) {
		this.document = document;
		this.controller = controller;
		this.views = views;
	}

	setupListeners(eventBus) {

	}
};
