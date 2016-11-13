'use strict';

const EventEmitter = require('./event_emitter');

class BaseView extends EventEmitter {
  constructor() {
    super();
  }
}

module.exports = BaseView;
