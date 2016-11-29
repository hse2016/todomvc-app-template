'use strict';

const BaseModel = require('../mvc_framework/base_model');

class TodoModel extends BaseModel {
  constructor(data) {
    super();
    this.setData(data);
  }
}

module.exports = TodoModel;
