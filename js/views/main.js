'use strict';

const BaseView = require('../mvc_framework/base_view');
const AppModel = require('../models/app');
const AppView = require('./app');

class MainView extends BaseView {
  constructor(mainElement, collection) {
    super(mainElement, collection);

    this
      .setTemplate(() => `
        ${this._views.reduce((previous, _, id) => previous +
          `<section id="todoapp_${id + 1}" class="todoapp"></section>`, '')}
        <footer class="info">
          <p><a class="add-todo-list">Add Another Todo List</a></p>
        </footer>
      `)
      .setElements({
        addTodoList: 'a.add-todo-list'
      })
      .setEvents({
        addTodoList: {
          click: 'add'
        }
      })
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

  add() {
    this._views.push({
      ViewClass: AppView,
      selector: `section#todoapp_${this._views.length + 1}`,
      model: new AppModel()
    });
    this.render();
  }
}

module.exports = MainView;
