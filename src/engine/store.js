import {Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery} from './item';

export default class Store {

	constructor(name, callback) {
		const localStorage = window.localStorage;
		let itemList;
		this.getLocalStorage = () => {
			return itemList || JSON.parse(localStorage.getItem(name) || '[]');
		};

		this.setLocalStorage = (data) => {
			localStorage.setItem(name, JSON.stringify(itemList = data));
		};

		if (callback) {
			callback();
		}
	}

	find(query, callback) {
		const data = this.getLocalStorage();
		let k;

		callback(data.filter(node => {
			for (k in query) {
				if (query[k] !== node[k]) {
					return false;
				}
			}
			return true;
		}));
	}

	update(update, callback) {
		const id = update.id;
		const data = this.getLocalStorage();
		let i = data.length;
		let k;

		while (i--) {
			if (data[i].id === id) {
				for (k in update) {
					data[i][k] = update[k];
				}
				break;
			}
		}

		this.setLocalStorage(data);

		if (callback) {
			callback();
		}
	}

	insert(item, callback) {
		const data = this.getLocalStorage();
		data.push(item);
		this.setLocalStorage(data);

		if (callback) {
			callback();
		}
	}


	remove(query, callback) {
		let k;

		const data = this.getLocalStorage().filter(node => {
			for (k in query) {
				if (query[k] !== node[k]) {
					return true;
				}
			}
			return false;
		});

		this.setLocalStorage(data);

		if (callback) {
			callback(data);
		}
	}

	
}
