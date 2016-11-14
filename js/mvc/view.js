'use strict';

let EventModel = require('./event-model');
/*
	Класс отображения. Отвечает за перерисовку элементов страницы, генерирует события,
	а так же реагирует на события.
 */

class View {
	constructor(htmlItem, controller, model) {
		this.htmlItem = htmlItem;
		this.emitter = new EventModel.EventEmitter();
		this.listener = new EventModel.Listener();

		this.emitter.addListener(controller);
		model.addListener(this);
	}
}

module.exports = View;
