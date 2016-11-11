/**
 * Created by tema on 11.11.16.
 */

var _ = require('underscore');
var Events = require('./Events');
var Models = require('./Model');
var Views = require('./View');

class Artemone {
	constructor() {
		this.Events = Events;
		this.Models = Models;
		this.Views = Views;
	}
}

module.exports = new Artemone();
