/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');
var Todo = require('./../Models/todo');

class Todos extends Artemone.Collection {

	constructor() {
		super();
		this.initialize();
	}

	initialize() {
		this.model = Todo;
	}

}

module.exports = Todos;
