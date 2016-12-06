module.exports = class Todo {
	constructor(id, taskText, isDone) {
		this.id = id;
		this.taskText = taskText;
		this.isDone = isDone;
	}
	static revive(json) {
		return new Todo(json.id, json.taskText, json.isDone);
	}
};
