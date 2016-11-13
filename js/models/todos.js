'use strict';

const BaseModel = require('../base_model');

class Todo {
  constructor(title, is_completed = false, is_editing = false) {
    this.title = title;
    this.is_completed = is_completed;
    this.is_editing = is_editing;
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
    this.listenTo(todo_view, 'edit_todo', (id, title) => this.editTodo(id, title));
    this.listenTo(todo_view, 'clear_completed', () => this.clearCompleted());
    this.listenTo(todo_view, 'toggle_all', (state) => this.toggleAll(state));
    this.todo_view = todo_view;
    this.renderTodoList();
  }

  changeState(id) {
    const todo = this.data[id];
    todo.is_completed = !todo.is_completed;
    this.renderTodoList();
  }

  deleteTodo(id) {
    delete this.data[id];
    this.renderTodoList();
  }

  addNewTodo(title) {
    const id = ++this.last_id;
    const todo = new Todo(title);
    this.data = Object.assign(this.data, {
      [id]: todo
    });
    this.renderTodoList();
  }

  editTodo(id, title) {
    if (title === '') {
      this.deleteTodo(id);
    } else {
      this.data[id].title = title;
      this.renderTodoList();
    }
  }

  clearCompleted() {
    for (let id in this.data) {
      if (this.data[id].is_completed) {
        delete this.data[id];
      }
    }
    this.renderTodoList();
  }

  toggleAll(state) {
    for (let id in this.data) {
      this.data[id].is_completed = state;
    }
    this.renderTodoList();
  }

  renderTodoList() {
    this.todo_view.renderTodoList(this.data);
  }
}

module.exports = TodosModel;
