'use strict'

class event-emitter {
    constructor() {
        this.listeners = {};
        this.observables = {};
    }
    
    on(name, handler, context) {
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

module.exports = event-emitter;
