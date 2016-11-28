/**
 * Created by dalexiv on 11/21/16.
 */
let EventBus = require('./EventBus');
module.exports = class Model {
  constructor(api) {
    this.api = api;
  }

  bindView(view) {
    view.setupListeners(new EventBus());
  }
};
