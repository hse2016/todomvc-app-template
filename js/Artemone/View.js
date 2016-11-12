/**
 * Created by tema on 11.11.16.
 */
'use strict';

var _ = require('underscore');
var Events = require('./Events');

class Views extends Events {

	constructor(tag) {
		super();
		this.setTag(tag);
		this.wrapTag();
		this.events();
	}

	render() {
		return this;
	}

	events() {
		return this;
	}

	setElement(selector) {
		this.el = document.querySelectorAll(selector);
		return this;
	}

	setModel(model) {
		this.model = model;
		this.listenTo(this.model, 'change', this.render, this);
	}

	setTemplate(path) {
		this.template =  _.template(document.querySelectorAll(path)[0].innerText);

	}

	setTag(tag) {
		this.tag = tag;
	}

	wrapTag() {
		if(this.tag !== undefined) {
			this.el = document.createElement(this.tag);
			console.log(this.el);
			// this.el = "<" + this.tag + " id='" + this.model.id + "'>" + this.el + "</" + this.tag + ">";
		}
	}

}

module.exports = Views;

// Your starting point. Enjoy the ride!
// Write npm run watch-js to start coding

