/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../../Artemone/Artemone');
const CommentsList = require('./../Comments/Comments');

class Todo extends Artemone.Models {
	constructor(attributes) {
		const defaults = {
			title: '',
			completed: false,
			comments: '',
		};

		super(defaults, attributes);

		this.comments = new CommentsList();

		if (this.get('comments')) {
			this.comments.setName(this.get('comments'));
			this.comments.load().then(() => {
					// console.log(res)
				});
		} else {
			this.set({ 'comments' : this.comments.name });
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
