'use strict';

let Listener = require('./event-model').Listener;

/*
	Класс контроллера. Связывает отображение с моделью.
 */

class Controller extends Listener {
	constructor(model) {
		super();
		this.model = model;
	}
}

module.exports = Controller;
