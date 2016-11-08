class API {

	constructor (adapter) {
		this.adapter = adapter;
	}

	getItem(key) {
		return adapter.getItem(key);
	}

	setItem(key, value) {
		adapter.setItem(key, value);
	}
}

class LocalStorageAdapter {

	constructor () {

	}

	static storage = localStorage;

	getItem(key) {
		LocalStorageAdapter.storage.getItem(key);
	}

	setItem(key, value) {
		LocalStorageAdapter.storage.setItem(key, value);
	}

}
