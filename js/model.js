'use strict';
const api = require('./api');

class Model {
	var store = {
		lastId: -1,
		todo: [
			{
				id: 0,
				name: 'task for test',
				isCompleted: false
			}
		]
	};
	constructor(){
		this.addTask = this.addTask.bind(this);
		this.removeTask = this.removeTask.bind(this);
		this.toggleTask = this.toggleTask.bind(this);
		this.removeAll = this.removeAll.bind(this);
		this.save = this.save.bind(this);
		this.load = this.load.bind(this);
	}
	addTask(name, isCompleted = true) {
		var id = this.store.lastId + 1;
		this.store.todo.push({id:id, name: name, isCompleted: isCompleted});
		this.store.lastId = id;
		return id;
	}
	removeTask(id){
		this.store.todo = this.store.todo.filter(todo => todo.id !== id);
	}
	toggleTask(id){
		this.store.todo = this.store.map(todo =>{
			if (todo!== id)
				return todo;
			else {
				todo.isCompleted = !todo.isCompleted;
				return todo;
			}
		});
	}
	removeAll(){
		this.store.todo = [];
		this.store.lastId = -1;
	}
	save(){
		api.save(this.store);
	}
	load(){
		this.store = api.load();
	}

}

module.exports = Model;
