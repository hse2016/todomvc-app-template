module.exports = class Todo {
	constructor(taskText, isDone) {
		this.taskText = taskText;
		this.isDone = isDone;
	}
	static revive(json) {
		return new Todo(json.taskText, json.isDone);
	}
};
