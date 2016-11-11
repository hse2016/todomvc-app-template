/**
 * Created by tema on 11.11.16.
 */

var Events = require('./Events');
var Models = require('./Model');
var Views = require('./View');
var Collection = require('./Collection');

class Artemone {
	constructor() {
		this.Events = Events;
		this.Models = Models;
		this.Views = Views;
		this.Collection = Collection;
	}
}

module.exports = new Artemone();
