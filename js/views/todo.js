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
    `)
      .render();
  }

  complete(id) {
    this.collection.complete(id);
  }

  edit(id, element) {
    const parent = element.parentElement.parentElement;
    Utils.addClass(parent, 'editing');
    const todoInput = parent.querySelector('input.edit');
    todoInput.focus();
    todoInput.selectionStart = todoInput.value.length;
  }

  updateInput(id, element, event) {
    const parent = element.parentElement;
    const todoInput = parent.querySelector('input.edit');
    if (event.keyCode === 13) {
      this.collection.edit(id, todoInput.value.trim());
    } else if (event.keyCode === 27) {
      todoInput.blur();
    }
  }

  delete(id) {
    this.collection.delete(id);
  }

  close(id, element) {
    const parent = element.parentElement;
    Utils.removeClass(parent, 'editing');
    parent.querySelector('input.edit').value = this.collection.getById(id).title;
  }
}

module.exports = TodoView;
