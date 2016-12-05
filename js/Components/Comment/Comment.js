/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../../Artemone/Artemone');

class Comment extends Artemone.Models {
	constructor(attributes) {
		const defaults = {
			title: '',
		};

		super(defaults, attributes);
	}
}

module.exports = Comment;
