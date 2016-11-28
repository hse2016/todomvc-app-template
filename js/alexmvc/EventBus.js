/**
 * Created by dalexiv on 11/22/16.
 */
module.exports = class EventBus {
	constructor() {
		this.listenersMap = new Map();
	}

	addEventHandler(event, handler) {
		if (this.listenersMap.has(event))
			this.listenersMap.get(event).add(handler);
		else
			this.listenersMap.set(event, [handler]);
	}

	sendEvent(event, data) {
		if (!this.listenersMap.has(event))
			return;


		var listeners = this.listenersMap.get(event);
		for (let key in listeners) {
			listeners[key](data);
		}
	}
};
