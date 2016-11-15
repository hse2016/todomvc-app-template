let assert = require('assert');
let EventEmitter = require('./EventEmitter.js').EventEmitter;

describe('EventEmitter', function () {
  describe('on(), off(), emit()', function () {
    it('Adds new handler', function () {
      let ee = new EventEmitter();
      let flag = false;

      ee.on('event', function(arg1, arg2) {
        assert.equal(1, arg1);
        assert.equal(2, arg2);
        flag = true;
      });

      ee.emit('event', 1, 2);
      assert(flag);
    });

    it('Able to add several handlers', function () {
      let ee = new EventEmitter();
      let flag1 = false;
      let flag2 = false;

      ee.on('event', function(arg) {
        assert.equal(1, arg);
        flag1 = true;
      });

      ee.on('event', function(arg) {
        assert.equal(1, arg);
        flag2 = true;
      });

      ee.emit('event', 1);
      assert(flag1);
      assert(flag2);
    });

    it('The same handlers are not allowed', function () {
      let ee = new EventEmitter();
      let val = 0;
      let handler = function(arg) {
        assert.equal(1, arg);
        val += 1;
      };

      ee.on('event', handler);
      ee.on('event', handler);

      ee.emit('event', 1);
      assert.equal(1, val);
    });

    it('Able to off from event', function () {
      let ee = new EventEmitter();
      let val = 0;
      let handler = function() {
        val += 1;
      };

      ee.on('event', handler);
      ee.emit('event');
      assert.equal(1, val);

      ee.off('event', handler);

      ee.emit('event');
      assert.equal(1, val);
    });
  });

  describe('listenTo(), unlistenTo()', function () {
    it('Only emitters can be listened to', function () {
      //todo add test
    });

    it('Allows to basic chain', function () {
      let ee1 = new EventEmitter();
      let ee2 = new EventEmitter();
      let flag = false;

      ee1.listenTo(ee2, 'event', function () {
        flag = true;
      });
      ee2.emit('event');

      assert(flag);
    });

    it('Allows to complex chain', function () {
      let ee1 = new EventEmitter();
      let ee2 = new EventEmitter();
      let ee3 = new EventEmitter();
      let flag2 = false;
      let flag3 = false;

      ee1.listenTo(ee2, 'event2', function () {
        flag2 = true;
      });
      ee1.listenTo(ee3, 'event3', function () {
        flag3 = true;
      });
      ee2.emit('event2');
      ee3.emit('event3');

      assert(flag2);
      assert(flag3);
    });

    it('Can be unlistened', function () {
      let ee1 = new EventEmitter();
      let ee2 = new EventEmitter();
      let value = 0;
      let handler = function () {
        value += 1;
      };

      ee1.listenTo(ee2, 'event', handler);

      ee2.emit('event');
      assert.equal(1, value);

      ee1.unlistenTo(ee2, 'event', handler);
      ee2.emit('event');
      assert.equal(1, value);
    });
  });
});
