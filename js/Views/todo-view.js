/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');
var _ = require('underscore');

class TodoView extends Artemone.Views {

	constructor() {
		super('li');
		this.setTemplate('#template-todo');
	}

	events() {
		console.log(this.el.getElementsByClassName('toggle'));
	}

	render() {
		this.el.innerHTML = this.template(this.model.attributes);
		return this;
	}

	toggleCompleted() {
		this.model.toggle();
	}
}

module.exports = TodoView;
