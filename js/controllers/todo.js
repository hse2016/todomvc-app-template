'use strict';

const BaseController = require('../base_controller');
const TodoView = require('../views/todo');
const TodosModel = require('../models/todos');


class TodoController extends BaseController {
  constructor() {
    super();
    this.todo_view = new TodoView();
    this.todos_models = new TodosModel(this.todo_view);
  }
}

module.exports = TodoController;
