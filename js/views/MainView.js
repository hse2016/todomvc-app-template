(function () {
  const View = require('../mvc/View').View;
  const Helper = require('../mvc/Helper');

  class MainView extends View {
    constructor() {
      super(
        {
          ini: function() {
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
    }
  }

  module.exports = {
    MainView: MainView
  };
})();
