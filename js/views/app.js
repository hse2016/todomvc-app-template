'use strict';

const BaseView = require('../mvc_framework/base_view');
const TodoView = require('./todo');

class AppView extends BaseView {
  constructor(mainElement, collection) {
    super(mainElement, collection);

    this.setElements({
      clearCompleted: 'button.clear-completed',
      newTodo: 'input.new-todo',
      todoCount: 'span.todo-count',
      todoList: 'ul.todo-list',
      toggleAll: 'input.toggle-all'
    });

    this.setEvents({
      clearCompleted: {
        click: 'clear'
      },
      newTodo: {
        keydown: 'add'
      },
      toggleAll: {
        click: 'toggle'
      }
    });

    this.setViews({
      todoView: [TodoView, this.el.todoList, this.collection]
    });

    this.listenTo(collection, 'data_changed', () => this.render());

    this.render();
    this.delegateEvents();
  }

  render() {
    const data = this.collection.getData();
    const completedCount = this.collection.getData()
      .reduce((count, todo) => {
        count += todo.completed;
        return count;
      }, 0);
    this.el.clearCompleted.hidden = completedCount === 0;
    this.el.toggleAll.checked = completedCount === data.length;
    this.el.todoCount.innerHTML = `<strong>${data.length}</strong> item${data.length === 1 ? '' : 's'} left`;
  }

  clear() {
    this.collection.clearСompleted();
  }

  add(event) {
    const title = this.el.newTodo.value.trim();
    if (event.keyCode === 13 && title.length > 0) {
      this.collection.add(title);
      this.el.newTodo.value = '';
    }
  }

  toggle() {
    this.collection.toggleAll(this.el.toggleAll.checked);
  }
}

module.exports = AppView;
