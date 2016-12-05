/**
 * Created by tema on 11.11.16.
 */

const Events = require('./Events');
const Models = require('./Model');
const Views = require('./View');
const Collection = require('./Collection');
const Router = require('./Router');

class Artemone {
	constructor() {
		this.Events = Events;
		this.Models = Models;
		this.Views = Views;
		this.Collection = Collection;
		this.Router = Router;
		this.app = {};
	}
}

module.exports = new Artemone();
