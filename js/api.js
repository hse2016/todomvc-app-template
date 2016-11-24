class API {

	constructor (adapter) {
		this.adapter = adapter;
	}

	getItem(key) {
		return this.adapter.getItem(key);
	}

	setItem(key, value) {
		this.adapter.setItem(key, value);
	}
}

module.exports = API;
