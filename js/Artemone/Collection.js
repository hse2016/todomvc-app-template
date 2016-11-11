/**
 * Created by tema on 11.11.16.
 */
'use strict';

var _ = require('underscore');
var Events = require('./Events');
var Model = require('./Model');


class Collection extends Events {

	constructor(attributes) {
		super();

		this.model = Model;
		this.models = [];

		// this.listenTo(this.model, 'change', this.render, this);
	}

	add(model) {
		this.models.push(model);
		this.emit('add');
	}
}

module.exports = Collection;
