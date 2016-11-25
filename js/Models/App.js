/**
 * Created by tema on 19.11.16.
 */

const Artemone = require('./../Artemone/Artemone');

class App extends Artemone.Models {
	constructor(attributes) {
		super();
		this.set({
			title: 'todos',
		});

		if (attributes !== undefined) {
			this.set(attributes);
		}
	}
}

module.exports = App;
