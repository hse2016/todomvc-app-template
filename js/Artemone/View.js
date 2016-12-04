/**
 * Created by tema on 11.11.16.
 */


const _ = require('underscore');
const Events = require('./Events');

class Views extends Events {

	constructor(tag, _class, _id) {
		super();
		this.setTag(tag);
		this.ui = {};
		this.id = _id;
		this.class = _class;
		this.wrapTag();
	}

	delegateEvents(data) {
		if (data === undefined)	{
			data = this.dEvents;
		}

		for (const i in data) {
			const type = i.split(' ', 1)[0];
			const selector = i.slice(type.length, i.length);
			this.onClick(this, this.el, selector, this.dEvents[i], type);
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
		return this;
	}

	render() {
		return this;
	}

	events() {
		return this;
	}

	remove() {
		this.el.outerHTML = '';
		return this;
	}

	attach(selector) {
		const el = document.querySelector(selector);
		el.appendChild(this.el);
		return this;
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
		// this.listenTo(this.model, 'change', this.render, this);
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
			if (this.id) {
				this.el.id = this.id;
			}
			if (this.class) {
				this.el.className = this.class;
			}
		}
	}

}

module.exports = Views;

