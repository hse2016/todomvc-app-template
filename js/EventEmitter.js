'use strict';
export default class EventEmitter {
	listeners = {};
	observables = {};

	on(eventName, handler) {
		if (typeof this.listeners[eventName] === 'undefined') {
			this.listeners[eventName] = [];
		}
		this.listeners[eventName].push(handler);
	}

	emit(eventName, ...args) {
		if (typeof this.listeners[eventName] !== 'undefined') {
			this.listeners[eventName].forEach(func => {
				func(eventName, ...args);
			});
		}
	}

	off(eventName, handler) {
		if (typeof this.listeners[eventName] !== 'undefined') {
			this.listeners[eventName] = this.listeners[eventName].filter(listen => handler != listen);
		}
	}

	removeAll(eventName) {
		delete this.listeners[eventName];
	}

	listenTo(observable, eventName) {
		if (typeof observable.on === 'undefined' ||
			typeof observable.off === 'undefined') {
			throw new Error('There are not "on" or "off" methods');
		}
		observable.on(eventName, this.handler);
		if (typeof this.observables[eventName] === 'undefined') {
			this.observables[eventName] = [];
		}
		this.observables[eventName].push(observable);

	}

	handler(eventName, ...args) {
	}

	unlistenFrom(observable, eventName) {
		observable.off(eventName, this.handler);
		if (typeof this.observables[eventName] !== 'undefined') {
			this.observables[eventName] = this.observables[eventName].filter(obs => obs !== observable);
		}
	}

	unlistenAll() {
		for (let key in this.observables) {
			this.observables[key].forEach(obs => obs.off(key, this.handler));
			delete this.observables[key];
		}
	}

}
