/**
 * Created by tema on 19.11.16.
 */

var Artemone = require('./../Artemone/Artemone');
var App = require('./../Models/App');

class AppView extends Artemone.Views {

	constructor() {
		super();
	}

	initialize() {
		this.setTemplate('#todoapp');
	}

	render() {
		this.el.innerHTML = this.template(this.model.attributes);
	}

}

module.exports = AppView;
