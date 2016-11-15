(function() {
  class LocalStorage {
    constructor() {
      this._objects = {};
      this._objectCount = 0;
    }

    setItem(id, object) {
      if (typeof id !== 'string') {
        return;
      }

      if (! this._objects.hasOwnProperty(id)) {
        this._objectCount += 1;
      }

      this._objects[id] = object;
    }

    getItem(id) {
      return this._objects[id];
    }

    removeItem(id, object) {
      if (this._objects.hasOwnProperty(id)) {
        this._objects[id] = undefined;
        this._objectCount -= 1;
      }
    }

    getItemCount() {
      return this._objectCount;
    }
  }

  module.exports = {
    LocalStorage: LocalStorage
  };
}
)();
