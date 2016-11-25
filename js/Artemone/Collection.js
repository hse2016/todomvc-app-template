/**
 * Created by tema on 11.11.16.
 */

const Events = require('./Events');
const Model = require('./Model');

class Collection extends Events {

	constructor() {
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
		const index = this.models.indexOf(model);
		if (index > -1) {
			this.models.splice(index, 1);
		}
		this.emit('remove');
		this.emit('change');
	}

	each(func, context) {
		for (let i = 0; i < this.models.length; i++) {
			func.bind(context);
			func(this.models[i]);
		}
	}

	where(params) {
		const result = [];
		for (let i = 0; i < this.models.length; i++) {
			if (this.hasParams(this.models[i], params)) {
				result.push(this.models[i]);
			}
		}
		return result;
	}

	hasParams(model, params) {
		for (const key in params) {
			if (model.get(key) !== params[key]) {
				return false;
			}
		}
		return true;
	}

	toString() {
		const result = [];
		for (let i = 0; i < this.models.length; i++) {
			result.push(this.models[i].attributes);
		}
		return JSON.stringify(result);
	}

	setName(name) {
		this.name = name;
		return this;
	}

	save() {
		if (this.storage === undefined) {
			return false;
		}
		this.storage.save(this.name, JSON.stringify(this.toString()));
	}

	load() {
		let status = false;
		if (this.storage === undefined) {
			return false;
		}

		const loadedString = this.storage.load(this.name);
		const jsonData = eval(JSON.parse(loadedString));
		for (const i in jsonData) {
			const item = new this.model(jsonData[i]);
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
