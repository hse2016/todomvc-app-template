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
    this.data = {
      1: new Todo('First'),
      2: new Todo('Second', true),
      3: new Todo('Third', true),
      4: new Todo('Fourth')
    };
    this.last_id = 4;

    this.listenTo(todo_view, 'change_state', (id) => this.changeState(id));
    this.listenTo(todo_view, 'delete_todo', (id) => this.deleteTodo(id));
    this.listenTo(todo_view, 'add_new_todo', (title) => this.addNewTodo(title));
    this.todo_view = todo_view;
    this.todo_view.renderTodos(this.data);
  }

  changeState(id) {
    const todo = this.data[id];
    todo.is_done = !todo.is_done;
    this.todo_view.renderTodos(this.data);
  }

  deleteTodo(id) {
    delete this.data[id];
    this.todo_view.renderTodos(this.data);
  }

  addNewTodo(title) {
    const id = ++this.last_id;
    const todo = new Todo(title);
    this.data = Object.assign(this.data, {
      [id]: todo
    });
    this.todo_view.renderTodos(this.data);
  }
}

module.exports = TodosModel;
