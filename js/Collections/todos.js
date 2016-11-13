/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');
var Todo = require('./../Models/todo');
var LocalStorage = require('./../Artemone/LocalStorage');

class Todos extends Artemone.Collection {

	constructor() {
		super();
		this.initialize();
		this.name = "Todos";
		this.storage = new LocalStorage();
	}

	initialize() {
		this.model = Todo;
	}

	completed() {
		return this.where({completed: true});
	}

}

module.exports = Todos;
