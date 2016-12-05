/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../../Artemone/Artemone');
const Comment = require('./../Comment/Comment');
const LocalStorage = require('./../../Artemone/LocalStorage');

class Comments extends Artemone.Collection {

	constructor() {
		super();
		this.initialize();
		this.storage = new LocalStorage();
	}

	initialize() {
		this.listenTo(this, 'change', this.save, this);
		this.model = Comment;
	}

	destroy(id) {
		this.emit('destroy', id);
	}

}

module.exports = Comments;
