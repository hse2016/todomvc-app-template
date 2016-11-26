/**
 * Created by tema on 19.11.16.
 */

const Artemone = require('./../Artemone/Artemone');

class App extends Artemone.Models {
	constructor(attributes) {
		const defaults = {
			title: 'todos',
		};

		super(defaults, attributes);
	}
}

module.exports = App;
