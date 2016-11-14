'use strict';
let API = require('../api');
let Adapters = require('../adapters');

/*
	Класс модели. Отвечает за взаимодействие с данными и бизнес-логику.
 */

class Model {
	constructor(options) {
		if (options.init) {
			if (typeof options.init !== 'function') {
				throw Error('Wrong format for Model.options.init');
			} else {
				options.init();
			}
		}
		if (options.data) {
			if (typeof options.data !== 'object') {
				throw Error('Wrong format for Model.options.data');
			} else {
				this.data = options.data;
			}
		}
		if (options.storage) {
			if (typeof options.storage !== 'string') {
				throw Error('Wrong format for Model.options.storage');
			} else {
				let adapter = Adapters[options.storage];
				if (adapter) {
					this.api = API(adapter);
				} else {
					throw Error('This type of api adapter is not specified');
				}
			}
		} else {
			this.api = API(Adapters['localStorage']);
		}
	}

	getItem(key) {
		return this.data.key;
	}

	setItem(key, data) {
		this.data['key'] = data;
	}



}

module.exports = Model;
