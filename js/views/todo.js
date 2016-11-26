'use strict';

const BaseView = require('../mvc_framework/base_view');
const Utils = require('../utils');

class TodoView extends BaseView {
  constructor(mainElement, collection) {
    super(mainElement, collection);
    this.listenTo(collection, 'data_changed', () => this.render());

    this
      .setEvents({
        'input.toggle': {
          click: 'complete'
        },
        'label': {
          dblclick: 'edit'
        },
        'button.destroy': {
          click: 'delete'
        },
        'input.edit': {
          keydown: 'updateInput',
          blur: 'close'
        }
      })
      .setTemplate((id, todo) => `
      <li id="todo_${id}" ${todo.completed ? 'class="completed"' : ''}>
        <div class="view">
          <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}="">
          <label>${todo.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.title}">
      </li>
    `);

    this.render();
  }

  complete(id) {
    this.collection.complete(id);
  }

  edit(id, element) {
    Utils.addClass(element, 'editing');
    const todo_input = element.querySelector('input.edit');
    todo_input.focus();
    todo_input.selectionStart = todo_input.value.length;
  }

  updateInput(id, element, event) {
    const todo_input = element.querySelector('input.edit');
    if (event.keyCode === 13) {
      this.collection.edit(id, todo_input.value.trim());
    } else if (event.keyCode === 27) {
      todo_input.blur();
    }
  }

  delete(id) {
    this.collection.delete(id);
  }

  close(id, element) {
    Utils.removeClass(element, 'editing');
    element.querySelector('input.edit').value = this.collection.getById(id).title;
  }
}

module.exports = TodoView;
