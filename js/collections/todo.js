'use strict';

const BaseCollection = require('../mvc_framework/base_collection');
const TodoModel = require('../models/todo');

class TodoCollection extends BaseCollection {
  constructor() {
    super(TodoModel);

    this.setData([
      {
        id: 1,
        title: 'First',
        completed: true
      },
      {
        id: 2,
        title: 'Second',
        completed: false
      }
    ]);
    this.lastId = 2;
  }

  getById(id) {
    let result;
    this.getData().forEach(todo => {
      if (todo.id === id) {
        result = todo;
      }
    });
    return result;
  }

  add(title) {
    const data = this.getData();
    data.push({
      id: ++this.lastId,
      title,
      completed: false
    });
    this.setData(data);
  }

  edit(id, title) {
    const data = this.getData();
    data.forEach(todo => {
      if (todo.id === id) {
        todo.title = title;
      }
    });
    this.setData(data);
  }

  delete(id) {
    this.setData(this.getData().filter(todo => todo.id !== id));
  }

  complete(id) {
    const data = this.getData();
    data.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    this.setData(data);
  }

  clearСompleted() {
    this.setData(this.getData().filter(todo => !todo.completed));
  }

  toggleAll(state) {
    const data = this.getData();
    data.forEach(todo => {
      todo.completed = state;
    });
    this.setData(data);
  }
}

module.exports = TodoCollection;
