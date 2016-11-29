'use strict';

const BaseView = require('../mvc_framework/base_view');
const TodoView = require('./todo');

class AppView extends BaseView {
  constructor(mainElement, collection) {
    super(mainElement, collection);

    this.listenTo(collection.todoCollection, 'data_changed', () => this.render());

    this
      .setElements({
        clearCompleted: 'button.clear-completed',
        footer: 'footer.footer',
        main: 'section.main',
        newTodo: 'input.new-todo',
        todoCount: 'span.todo-count',
        todoList: 'ul.todo-list',
        toggleAll: 'input.toggle-all'
      })
      .setEvents({
        clearCompleted: {
          click: 'clear'
        },
        newTodo: {
          keydown: 'add'
        },
        toggleAll: {
          click: 'toggle'
        }
      })
      .setTemplate(() => {
        const data = this.collection.todoCollection.getData();
        const completedCount = this.collection.todoCollection.getData()
          .reduce((count, todo) => {
            count += todo.completed;
            return count;
          }, 0);
        const itemsLeft = data.length - completedCount;

        return (`
          <header class="header">
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus>
          </header>
          <section class="main" ${data.length === 0 ? 'hidden' : ''}>
            <input class="toggle-all"
                   type="checkbox"
                   ${data.length > 0 && completedCount === data.length ? 'checked' : ''}>
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list"></ul>
          </section>
          <footer class="footer" ${data.length === 0 ? 'hidden' : ''}>
            <span class="todo-count">
              <strong>${itemsLeft}</strong> item${itemsLeft === 1 ? '' : 's'} left
            </span>
            <ul class="filters">
              <li>
                <a class="selected" href="#/">All</a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            <button class="clear-completed" ${completedCount === 0 ? 'hidden' : ''}>
              Clear completed
            </button>
          </footer>
        `);
      })
      .setViews([
        {
          ViewClass: TodoView,
          selector: 'ul.todo-list',
          model: this.collection.todoCollection
        }
      ])
      .render();
  }

  clear() {
    this.collection.todoCollection.clearСompleted();
  }

  add(_, __, event) {
    const title = this.el.newTodo.value.trim();
    if (event.keyCode === 13 && title.length > 0) {
      this.collection.todoCollection.add(title);
      this.el.newTodo.value = '';
    }
  }

  toggle() {
    this.collection.todoCollection.toggleAll(this.el.toggleAll.checked);
  }
}

module.exports = AppView;
