/**
 * Created by tema on 11.11.16.
 */
'use strict';

var Events = require('./Events');
var Model = require('./Model');

class Collection extends Events {

	constructor(attributes) {
		super();

		this.model = Model;
		this.models = [];
		this.storage = undefined;

	}

	add(model) {
		this.models.push(model);
		this.listenTo(model, 'destroy', this.removeEvent, this);
		this.listenTo(model, 'change', this.emitChange, this);
		this.emit('add', model);
		this.emit('change');
	}

	removeEvent(text, model) {
		this.remove(model);
	}

	remove(model) {
		var index = this.models.indexOf(model);
		if (index > -1) {
			this.models.splice(index, 1);
		}
		this.emit('remove');
		this.emit('change');
	}

	each(func, context) {
		for(var i = 0; i < this.models.length; i++) {
			func.bind(context);
			func(this.models[i]);
		}
	}

	where(params) {
		let result = [];
		for(var i = 0; i < this.models.length; i++) {
			if(this.hasParams(this.models[i], params))
				result.push(this.models[i]);
		}
		return result;
	}

	hasParams(model, params) {
		for(var key in params) {
			if(model.get(key) !== params[key])
				return false;
		}
		return true;
	}

	toString() {
		let result = []
		for(var i = 0; i < this.models.length; i++) {
			result.push(this.models[i].attributes);
		}
		return JSON.stringify(result);
	}

	setName(name) {
		this.name = name;
		return this;
	}

	save() {
		if(this.storage === undefined){
			console.log('Storage class doesn\'t init')
			return false;
		}
		this.storage.save(this.name, JSON.stringify(this.toString()));
	}

	load() {
		let status = false;
		if (this.storage === undefined) {
			console.log('Storage class doesn\'t init');
			return false;
		}

		let loaded_string = this.storage.load(this.name);
		let json_data = eval(JSON.parse(loaded_string));
		for (var i in json_data) {
			let item = new this.model(json_data[i]);
			this.add(item);
			status = true;
		}

		return status;
	}

	emitChange() {
		this.emit('change-model');
	}

}

module.exports = Collection;
