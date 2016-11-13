'use strict';

const BaseView = require('../base_view');

class TodoView extends BaseView {
  constructor() {
    super();
    this.todo_list = document.querySelector('.todo-list');
    this.new_todo = document.querySelector('.new-todo');
    this.addOnAddNewTodoListener();
  }

  renderTodos(todos) {
    let html = '';
    for (let id in todos) {
      html += this.todoTemplate(id, todos[id]);
    }
    this.todo_list.innerHTML = html;
    this.addAllListeners(todos);
  }

  todoTemplate(id, todo) {
    return (
      `<li id="todo_${id}" ${todo.is_done ? 'class="completed"' : ''}>
        <div class="view">
          <input class="toggle" type="checkbox" ${todo.is_done ? 'checked' : ''}>
          <label>${todo.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
      </li>`
    );
  }


  addAllListeners(todos) {
    for (let id in todos) {
      this.addOnChangeListener(id);
      this.addOnDeleteListener(id);
    }
  }

  addOnAddNewTodoListener() {
    this.new_todo.onkeyup = event => {
      if (event.keyCode === 13) {
        const title = this.new_todo.value;
        this.emit('add_new_todo', title);
        this.new_todo.value = '';
      }
    };
  }

  addOnChangeListener(id) {
    document.querySelector(`#todo_${id}>.view>.toggle`)
      .onchange = () => this.emit('change_state', id);
  }

  addOnDeleteListener(id) {
    document.querySelector(`#todo_${id}>.view>.destroy`)
      .onclick = () => this.emit('delete_todo', id);
  }
}

module.exports = TodoView;
