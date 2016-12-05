

class EventEmitter {
	constructor() {
		this.listeners = {};
		this.observables = {};
	}

	/*
	 methods for observable object
	 */
	// subscribe to event
	on(eventName, handler, context) {
		if (typeof this.listeners[eventName] === 'undefined') {
			this.listeners[eventName] = [];
		}
		this.listeners[eventName].push({ 'Handler' : handler, 'Context' : context });
	}

	// rise the event
	emit(eventName, ...args) {
		if (typeof this.listeners[eventName] !== 'undefined') {
			this.listeners[eventName].forEach((func) => {
				func.Handler.call(func.Context, eventName, ...args);
			});
		}
	}

	// unsubscribe from event
	off(eventName, handler) {
		if (typeof this.listeners[eventName] !== 'undefined') {
			this.listeners[eventName] = this.listeners[eventName].filter(listen => handler !== listen);
		}
	}

	// remove all subscribers
	removeAll(eventName) {
		delete this.listeners[eventName];
	}

	/*
	 methods for listener object
	 */

	// connect handler method to listen eventName of observable object
	listenTo(observable, eventName, handler, context) {
		if (typeof observable.on === 'undefined' ||
			typeof observable.off === 'undefined') {
			throw new Error('There are not "on" or "off" methods');
		}
		observable.on(eventName, handler, context);
		if (typeof this.observables[eventName] === 'undefined') {
			this.observables[eventName] = [];
		}
		this.observables[eventName].push({ observable, handler });
	}

	unlistenFrom(observable, eventName) {
		observable.off(eventName, this.observables[eventName].handler);
		if (typeof this.observables[eventName] !== 'undefined') {
			this.observables[eventName] = this.observables[eventName]
											  .filter(obs => obs.observable !== observable);
		}
	}

	unlistenAll() {
		for (const key in this.observables) {
			this.observables[key].forEach(obs => obs.observable.off(key, obs.handler));
			delete this.observables[key];
		}
	}

	onClick(context, element, selector, handle, type) {
		let el_selector;

		if (element === undefined) {
			return;
		}

		if (selector !== '' && selector !== undefined) {
			el_selector = element.querySelector(selector);
		}

		if (el_selector) {
			el_selector.addEventListener(type || 'click', handle.bind(context));
			return el_selector;
		}

		return undefined;
	}
}

module.exports = EventEmitter;
