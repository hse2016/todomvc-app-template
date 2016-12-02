//Little mvc framework
var event-emitter = require('./events-emitter');
var local-storage = require('./local-storage');
var  routing = require('./routing');
class wtfmvc {
	constructor() {
		this.event-emitter = event-emitter;
        this.local-storage = local-storage;
        this.routing = routing;
		this.app = {};
	}
}

module.exports = new wtfmvc();
