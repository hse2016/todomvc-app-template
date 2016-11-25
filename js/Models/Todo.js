/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../Artemone/Artemone');

class Todo extends Artemone.Models {
	constructor(attributes) {
		super();
		this.set({
			title: '',
			completed: false,
		});

		if (attributes) {
			this.set(attributes);
		}
	}

	setCompleted(completed) {
		this.set({
			completed: completed,
		});
	}

	toggle() {
		this.set({
			completed: !this.get('completed'),
		});
		return this.get('completed');
	}

}

module.exports = Todo;
