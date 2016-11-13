'use strict';

const EventEmitter = require('./event_emitter');

class BaseModel extends EventEmitter {
  constructor() {
    super();
  }
}

module.exports = BaseModel;
