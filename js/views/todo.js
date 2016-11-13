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

    data.forEach((todo, id) => this.addOnChangeListener(id));
  }

  changeTodo(id, todo) {
    console.log("TodoView.changeTodo", todo);
    document.querySelector(`#todo_${id}`).outerHTML = this.todoTemplate(id, todo);
    this.addOnChangeListener(id);
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

  addOnChangeListener(id) {
    document.querySelector(`#todo_${id}>.view>.toggle`)
      .onchange = () => this.emit('change_state', id);
  }
}

module.exports = TodoView;
