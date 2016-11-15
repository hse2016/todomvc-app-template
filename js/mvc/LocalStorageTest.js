let assert = require('assert');
let LocalStorage = require('./LocalStorage').LocalStorage;

describe('LocalStorage', function () {
  describe('constructor()', function () {
    it('Creates new Local Storage object', function () {
      let ls = new LocalStorage();
    });
  });

  describe('setItem', function () {
    it('New objects can be added', function () {
      let key = 'nya';
      let ls = new LocalStorage();
      let nya = {text: key};
      ls.setItem(key, nya);
      assert.equal(nya, ls.getItem(key));
    });

    it('Ignores non-string ids', function () {
      let key = 1;
      let ls = new LocalStorage();
      let nya = {text: key};

      ls.setItem(1, nya);

      assert.equal(undefined, ls.getItem(1));
    });
  });

  describe('removeItem()', function () {
    it('Removes object', function () {
      let key = 'nya';
      let ls = new LocalStorage();
      let nya = {text: key};

      ls.setItem(key, nya);
      assert.equal(nya, ls.getItem(key));
      ls.removeItem(key);

      assert.equal(undefined, ls.getItem(key));
    });

    it('Ignores non-string ids', function () {
      let key = 1;
      let ls = new LocalStorage();
      let nya = {text: key};

      ls.setItem(key, nya);
      assert.equal(undefined, ls.getItem(key));
      ls.removeItem(key);

      assert.equal(undefined, ls.getItem(key));
    });
  });

  describe('getItemCount', function () {
    it('Tells how many objects we have', function () {
      let key1 = 'nya1';
      let key2 = 'nya2';
      let ls = new LocalStorage();
      let object1 = {text: 'Nya :3'};
      let object2 = {text: 'Nya :333'};

      ls.setItem(key1, object1);
      assert.equal(1, ls.getItemCount());
      ls.setItem(key2, object2);
      assert.equal(2, ls.getItemCount());
      ls.removeItem(key2);
      assert.equal(1, ls.getItemCount());
      ls.removeItem(key1);
      assert.equal(0, ls.getItemCount());
    });
  });
});
