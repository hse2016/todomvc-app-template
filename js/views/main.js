'use strict';

const BaseView = require('../mvc_framework/base_view');
const AppModel = require('../models/app');
const AppView = require('./app');

class MainView extends BaseView {
  constructor(mainElement, collection) {
    super(mainElement, collection);

    this
      .setTemplate(() => `
        <section id="todoapp_1" class="todoapp"></section>
        <section id="todoapp_2" class="todoapp"></section>
        <footer class="info">
          <p>Double-click to edit a todo</p>
          <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
          <p>Created by <a href="http://todomvc.com">you</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      `)
      .setViews([
        {
          ViewClass: AppView,
          selector: 'section#todoapp_1',
          model: new AppModel()
        },
        {
          ViewClass: AppView,
          selector: 'section#todoapp_2',
          model: new AppModel()
        }
      ])
      .render();
  }
}

module.exports = MainView;
