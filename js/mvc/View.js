(function () {
  const EventEmitter = require('./EventEmitter').EventEmitter;
  const Helper = require('../mvc/Helper');

  class View extends EventEmitter {
    constructor(props) {
      super();
      let _props = props || {};

      this._ini = _props.ini || function(){};
      this._eventDef = _props.eventDef || [];
      this._target = _props.target || '';

      this._ini();
      this.iniDOMLogic(_props);
    }

    iniDOMLogic(props) {
      console.log('test');
      for (let i = 0; i < props.eventDef.length; ++i) {
        let _event = props.eventDef[i];
        if (_event) {
          let elems = Helper.findAllElements(_event.selector);
          for (let i = 0; i < elems.length; ++i) {
            if (_event.type === 'click') {
              elems[i].onclick = props[_event.handler].bind(props);
            }
          }
        }
      }
    }

    test() {
      console.log(1);
    }
  }

  module.exports = {
    View: View
  };
})();
