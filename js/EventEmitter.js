'use strict';
export default class EventEmitter {
	listeners = {};
	observables = {};

	/*
		methods for observable object
	 */
	// subscribe to event
	on(eventName, handler) {
		if (typeof this.listeners[eventName] === 'undefined') {
			this.listeners[eventName] = [];
		}
		this.listeners[eventName].push(handler);
	}
	// rise the event
	emit(eventName, ...args) {
		if (typeof this.listeners[eventName] !== 'undefined') {
			this.listeners[eventName].forEach(func => {
				func(eventName, ...args);
			});
		}
	}
	//unsubscribe from event
	off(eventName, handler) {
		if (typeof this.listeners[eventName] !== 'undefined') {
			this.listeners[eventName] = this.listeners[eventName].filter(listen => handler != listen);
		}
	}
	//remove all subscribers
	removeAll(eventName) {
		delete this.listeners[eventName];
	}

	/*
		methods for listener object
	 */

	// connect handler method to listen eventName of observable object
	listenTo(observable, eventName, handler) {
		if (typeof observable.on === 'undefined' ||
			typeof observable.off === 'undefined') {
			throw new Error('There are not "on" or "off" methods');
		}
		observable.on(eventName, handler);
		if (typeof this.observables[eventName] === 'undefined') {
			this.observables[eventName] = [];
		}
		this.observables[eventName].push({observable, handler});

	}

	unlistenFrom(observable, eventName) {
		observable.off(eventName, this.observables[eventName].handler);
		if (typeof this.observables[eventName] !== 'undefined') {
			this.observables[eventName] = this.observables[eventName].filter(obs => obs.observable !== observable);
		}
	}

	unlistenAll() {
		for (let key in this.observables) {
			this.observables[key].forEach(obs => obs.observable.off(key, obs.handler));
			delete this.observables[key];
		}
	}

}
