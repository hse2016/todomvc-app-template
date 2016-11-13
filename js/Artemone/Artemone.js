/**
 * Created by tema on 11.11.16.
 */

var Events = require('./Events');
var Models = require('./Model');
var Views = require('./View');
var Collection = require('./Collection');
var Router = require('./Router')

class Artemone {
	constructor() {
		this.Events = Events;
		this.Models = Models;
		this.Views = Views;
		this.Collection = Collection;
		this.Router = Router
		this.app = {};
	}
}

module.exports = new Artemone();
