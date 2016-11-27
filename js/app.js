const Router = require('./alexmvc/Router');
const AllController = require('./AllController');
const AllView = require('./AllView');
const AllModel = require('./AllModel');
(function (window) {
  const router = new Router(window, {
    all: '',
    completed: 'completed',
    active: 'active',
  }, {
    all() {
      const model = new AllModel(null);
      const controller = new AllController(router, model);

      const view = new AllView(window.document, controller, {
        counter: window.document.getElementById('todo-count'),
        edittext: window.document.getElementsByClassName('new-todo')[0],
      });

      model.bindView(view);
      controller.openPage();
    },
  });

  router.navigateTo('all');
}(window));

