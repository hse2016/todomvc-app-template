'use strict';

const BaseView = require('../base_view');

class TodoView extends BaseView {
  constructor() {
    super();
    this.todo_list = document.querySelector('.todo-list');
  }

  addData(data) {
    data.forEach((todo, id) => {
      this.todo_list.innerHTML += this.todoTemplate(id, todo);
    });

    data.forEach((todo, id) => this.addAllListener(id));
  }

  changeTodo(id, todo) {
    document.querySelector(`#todo_${id}`).outerHTML = this.todoTemplate(id, todo);
    this.addAllListener(id);
  }

  deleteTodo(id) {
    document.querySelector(`#todo_${id}`).outerHTML = "";
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

  addAllListener(id) {
    this.addOnChangeListener(id);
    this.addOnDeleteListener(id);
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
