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

	clear() {
		for (const i in this.models) {
			this.remove(this.models[i]);
		}
	}

	remove(model) {
		const index = this.models.indexOf(model);
		if (index > -1) {
			this.models.splice(index, 1);
		}
		this.emit('remove');
		this.emit('change');
	}

	removeAll(models) {
		for (const i in models) {
			this.remove(models[i]);
		}
	}

	each(func, context) {
		for (let i = 0; i < this.models.length; i++) {
			func.bind(context);
			func(this.models[i]);
		}
	}

	where(params) {
		const wf = function whereFilter(item) {
			if (this.hasParams(item, params)) {
				return item;
			}
		};

		const result = this.models.filter(wf.bind(this));

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

	unsave() {
		if (this.storage === undefined) {
			return false;
		}
		this.storage.remove(this.name);
	}

	load() {
		const promise = new Promise((resolve, reject) => {
			if (this.storage === undefined) {
				reject("Can't find collection in datastore");
			}

			const loadedString = this.storage.load(this.name);
			const jsonData = eval(JSON.parse(loadedString));
			for (const i in jsonData) {
				const item = new this.model(jsonData[i]);
				this.add(item);
			}

			resolve(this);
		});

		return promise;
	}

	emitChange() {
		this.emit('change-model');
	}

}

module.exports = Collection;
