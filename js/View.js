/**
 * Created by tema on 11.11.16.
 */
'use strict';

var _ = require('underscore');
var Events = require('./Events');

class Views extends Events {

	constructor(selector) {
		super();
		this.setElement(selector);
	}

	render() {
		return this;
	}

	setElement(selector) {
		this.el = document.querySelectorAll(selector);
	}

	setModel(model) {
		this.model = model;
		this.listenTo(this.model, 'change', this.render, this);
	}

}

module.exports = Views;

// Your starting point. Enjoy the ride!
// Write npm run watch-js to start coding

