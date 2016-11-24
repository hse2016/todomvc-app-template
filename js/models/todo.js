'use strict';

let Model = require('../mvc/smvc').Model;

class Todo extends Model {

	constructor(task){
		super( {
			data : {
				task : task,
				isDone : false
			}
		});
	}

	toggleStatus() {
		this.data.isDone = !this.data.isDone;
	}
}

module.exports = Todo;
