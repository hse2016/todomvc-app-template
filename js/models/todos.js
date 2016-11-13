'use strict';

const BaseModel = require('../base_model');

class Todo {
  constructor(title, is_done = false) {
    this.title = title;
    this.is_done = is_done;
  }
}

class TodosModel extends BaseModel {
  constructor(todo_view) {
    super();
    this.data = [
      new Todo('First'),
      new Todo('Second', true),
      new Todo('Third', true),
      new Todo('Fourth'),

    ];
    todo_view.addData(this.data);
    this.listenTo(todo_view, 'change_state', (...args) => this.changeState(...args));
    this.todo_view = todo_view;
  }

  changeState(id) {
    const todo = this.data[id];
    todo.is_done = !todo.is_done;
    this.todo_view.changeTodo(id, todo);
    console.log('TodosModel.changeState', id);
  }
}

module.exports = TodosModel;
