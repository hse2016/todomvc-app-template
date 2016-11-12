/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./../Artemone/Artemone');

class Todo extends Artemone.Models {
	constructor(attributes) {

		super();
		this.set({
			title: '',
			completed: false
		});

		if(attributes !== undefined) {
			this.set(attributes);
		}
	}

	toggle() {
		this.set({
			completed: !this.get('completed')
		});
	}

}

module.exports = Todo;
