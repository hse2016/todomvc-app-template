'use strict';

let EventModel = require('./event-model');
let Handlebars = require('handlebars');
/*
	Класс отображения. Отвечает за перерисовку элементов страницы, генерирует события,
	а так же реагирует на события.
 */

class View {
	constructor(htmlItem, controller, model) {
		this.htmlItem = htmlItem;
		this.emitter = new EventModel.EventEmitter();
		this.listener = new EventModel.Listener();
		this.childs = [];

		this.emitter.addListener(controller);
		model.addListener(this);

		this.listener.on('change', this.render());
		this.render();
	}

	render() {
		let template = '';
		for (let i = 0; i < this.childs.length; i++) {
			template += this.childs[i].render();
		}

		//return Handlebars.compile(this.htmlItem.innerHTML())(this.);
	}
}


module.exports = View;
