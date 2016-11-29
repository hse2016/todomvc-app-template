'use strict';

const EventEmitter = require('../event_emitter');

class BaseModel extends EventEmitter {
  constructor() {
    super();
  }

  setData(data) {
    for (let key in data) {
      this[key] = data[key];
    }
    this.emit('data_changed');
  }

  forEach(callback, thisArg) {
    [{}].forEach(callback, thisArg);
  }
}

module.exports = BaseModel;
