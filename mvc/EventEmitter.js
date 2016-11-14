(function () {
  class EventEmitter {
    constructor() {
      this._onHandlers = {};
      this._listenToHandlers = {};
    }

    on(eventName, handler) {
      if (this._onHandlers[eventName] === undefined) {
        this._onHandlers[eventName] = [];
      }

      for (let i = 0; i < this._onHandlers[eventName].length; ++i) {
        if (this._onHandlers[eventName][i] === handler) {
          return;
        }
      }

      this._onHandlers[eventName].push(handler);
    }

    off(eventName, handler) {
      if (this._onHandlers[eventName] === undefined) {
        this._onHandlers[eventName] = [];
      }

      for (let i = 0; i < this._onHandlers[eventName].length; ++i) {
        if (this._onHandlers[eventName][i] === handler) {
          this._onHandlers[eventName].splice(i, 1);
          break;
        }
      }
    }

    listenTo(object, eventName, handler) {
      if (! (object instanceof EventEmitter)) {
        return;
      }

      if (this._listenToHandlers[object] === undefined) {
        this._listenToHandlers[object] = {
          handlers: [],
          newHandlers: [],
        };
      }

      for (let i = 0; i < this._listenToHandlers[object].handlers.length; ++i) {
        if (this._listenToHandlers[object].handlers[i] === handler) {
          return;
        }
      }

      let newHandler = function (...args) {
        handler.apply(null, args);
      };

      this._listenToHandlers[object].handlers.push(handler);
      this._listenToHandlers[object].newHandlers.push(newHandler);

      object.on(eventName, newHandler);
    }

    unlistenTo(object, eventName, handler) {
      if (this._listenToHandlers[object] === undefined) {
        return;
      }

      for (let i = 0; i < this._listenToHandlers[object].handlers.length; ++i) {
        if (this._listenToHandlers[object].handlers[i] === handler) {
          let newHandler = this._listenToHandlers[object].newHandlers[i];

          this._listenToHandlers[object].handlers.splice(i, 1);
          this._listenToHandlers[object].newHandlers.splice(i, 1);

          object.off(eventName, newHandler);
          break;
        }
      }
    }

    emit(eventName, ...args) {
      if (this._onHandlers[eventName] !== undefined) {
        for (let i = 0; i < this._onHandlers[eventName].length; ++i) {
          this._onHandlers[eventName][i].apply(null, args);
        }
      }
    }
  }

  module.exports = {
    EventEmitter: EventEmitter
  };
})();
