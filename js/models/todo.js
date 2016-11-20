'use strict';

const BaseModel = require('../mvc_framework/base_model');

class TodoModel extends BaseModel {
  constructor({title, completed}) {
    super();
    this.title = title;
    this.completed = completed;
  }
}

module.exports = TodoModel;