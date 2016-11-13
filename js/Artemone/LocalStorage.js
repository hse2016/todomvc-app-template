/**
 * Created by tema on 14.11.16.
 */

class LocalStorage {
	save(key, value) {
		localStorage.setItem(key, value);
		return true;
	}

	load(key) {
		return localStorage.getItem(key);
	}
}

module.exports = LocalStorage;
