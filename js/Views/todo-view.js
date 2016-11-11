/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');
var _ = require('underscore');

class TodoView extends Artemone.Views {

	constructor() {
		super();
		this.setTemplate('#template-todo');
	}

	render() {
		this.el = this.template(this.model.attributes);
		console.log(this.model.attributes);
		return this;
	}
}

module.exports = TodoView;
