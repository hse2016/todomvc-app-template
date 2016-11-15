(function () {
  const View = require('../mvc/View').View;
  const Helper = require('../mvc/Helper');

  let MainView = View.define(
      {
        ini: function() {
          console.log('test');
        },
        eventDef: [
          {
            type: 'click',
            selector: '.destroy',
            handler: 'destroy'
          }
        ],
        destroy: function() {
          console.log('nya');
        }
      }
    );

  module.exports = {
    MainView: MainView
  };
})();
