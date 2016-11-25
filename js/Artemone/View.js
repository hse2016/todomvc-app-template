/**
 * Created by tema on 11.11.16.
 */


const _ = require('underscore');
const Events = require('./Events');

class Views extends Events {

	constructor(tag) {
		super();
		this.setTag(tag);
		this.wrapTag();
		this.ui = {};
	}

	delegateEvents(data) {
		if (data === undefined)	{
			data = this.dEvents;
		}

		for (const i in data) {
			const type = i.split(' ', 1)[0];
			const selector = i.slice(type.length, i.length);
			switch (type) {
			case 'click':
				this.onClick(this, this.el, selector, this.dEvents[i]);
				break;
			case 'keypress':
				this.onKeyPress(this, this.el, selector, this.dEvents[i]);
				break;
			default:
				break;
			}
		}
	}

	updateEvent(name) {
		const a = {};
		a[name] = '';
		this.delegateEvents(a);
	}

	setUI() {
		for (const i in this.dUI) {
			this.ui[i] = this.el.querySelector(this.dUI[i]);
		}
		return this;
	}

	initialize() {

	}

	render() {
		return this;
	}

	events() {
		return this;
	}

	remove() {
		this.el.outerHTML = '';
	}

	setElement(selector) {
		this.el = document.querySelector(selector);
		return this;
	}

	setName(name) {
		this.name = name;
		if (this.model) {
			this.model.setName(name);
		}
		return this;
	}

	setModel(model) {
		this.model = model;
		this.listenTo(this.model, 'change', this.render, this);
		this.listenTo(this.model, 'destroy', this.remove, this);
		this.initialize();
		return this;
	}

	setTemplate(path) {
		this.template = _.template(document.querySelector(path).innerText);
	}

	setTag(tag) {
		this.tag = tag;
	}

	wrapTag() {
		if (this.tag !== undefined) {
			this.el = document.createElement(this.tag);
		}
	}

}

module.exports = Views;

