'use strict';

class EventEmitter {
	constructor() {
		this._listeners = [];
	}

	emit(event, context) {
		for(let i = 0; i < this._listeners.length; i++) {
			this._listeners.notify(event, context);
		}
	}

	addListener(listener) {
		if (listener) {
			this._listeners.push(listener);
		} else {
			throw Error('Invalid parameter');
		}
	}

	removeListener(listener) {
		let index = this._listeners.indexOf(listener);
		if (index != -1) {
			this._listeners.splice(index, 1);
		}
	}
}

class Listener {
	constructor() {
		this._handlers = {};
	}

	on(event, action) {
		this._handlers[event] = action;
	}

	off(event) {
		delete this._handlers[event];
	}

	notify(event, context) {
		if (this._handlers[event]) {
			this._handlers[event](context);
		}
	}
}

module.exports = {'EventEmitter' : EventEmitter, 'Listener' : Listener};
