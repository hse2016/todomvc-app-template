'use strict';

const BaseModel = require('../mvc_framework/base_model');
const TodoCollection = require('../collections/todo');

class AppModel extends BaseModel {
  constructor() {
    super();
    this.setData({
      todoCollection: new TodoCollection()
    });
  }
}

module.exports = AppModel;
