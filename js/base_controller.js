'use strict';

const EventEmitter = require('./event_emitter');

class BaseController extends EventEmitter {
  constructor() {
    super();
  }
}

module.exports = BaseController;
