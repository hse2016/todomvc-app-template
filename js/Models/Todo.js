/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../Artemone/Artemone');

class Todo extends Artemone.Models {
	constructor(attributes) {
		const defaults = {
			title: '',
			completed: false,
		};

		super(defaults, attributes);
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
