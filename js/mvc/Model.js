(function () {
  const EventEmitter = require('./EventEmitter').EventEmitter;

  class Model extends EventEmitter {
    registerGetterAndSetter(propertyName) {
      let that = this;

      this.defineProperty('get' + propertyName, function () {
        return that['_' + propertyName];
      });

      this.defineProperty('set' + propertyName, function (value) {
        that['_' + propertyName] = value;
        emit('dataChanged', propertyName);
      });
    }
  }

  module.exports = {
    Model: Model
  };
})();
