class LocalStorageAdapter {

	constructor () {
		this.storage = localStorage;
	}

	getItem(key) {
		return this.storage.getItem(key);
	}

	setItem(key, value) {
		this.storage.setItem(key, value);
	}

}

module.exports = LocalStorageAdapter;
