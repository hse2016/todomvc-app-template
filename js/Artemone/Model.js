/**
 * Created by tema on 11.11.16.
 */

const Events = require('./Events');

let modelCount = 0;

class Models extends Events {
	constructor(attributes) {
		super();
		this.attributes = {};
		this.set(attributes);

		this.id = modelCount++;
	}

	set(attributes) {
		for (const a in attributes) {
			this.attributes[a] = attributes[a];
		}
		this.emit('change');
	}

	get(key) {
		return this.attributes[key];
	}

	destroy() {
		this.emit('destroy', this);
	}

	toString() {
		return JSON.stringify(this.attributes);
	}
}

module.exports = Models;
