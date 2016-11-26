'use strict';

const EventEmitter = require('../event_emitter');

class BaseCollection extends EventEmitter {
  constructor(model) {
    super();
    this._model = model;
  }

  setData(data) {
    this._data = data;
    this.emit('data_changed');
  }

  getData() {
    return this._data;
  }

  forEach(callback, thisArg) {
    this._data.forEach(callback, thisArg);
  }
}

module.exports = BaseCollection;
