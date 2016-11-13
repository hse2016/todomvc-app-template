'use strict';

const BaseView = require('../base_view');

class TodoView extends BaseView {
  constructor() {
    super();
    this.todo_list = document.querySelector('.todo-list');

    this.addOnAddNewTodoListener();
    this.addOnClearCompletedListener();
    this.addOnToggleAllListener();
  }

  renderTodoList(todos) {
    let html = '';
    for (let id in todos) {
      const todo = todos[id];
      html += this.todoTemplate(id, todo);
    }
    this.todo_list.innerHTML = html;
    this.addAllListeners(todos);
  }

  todoTemplate(id, todo) {
    return (
      `<li id="todo_${id}" class="${todo.is_completed ? 'completed' : ''} ${todo.is_editing ? 'editing' : ''}">
        <div class="view">
          <input class="toggle" type="checkbox" ${todo.is_completed ? 'checked' : ''}>
          <label>${todo.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.title}">
      </li>`
    );
  }

  editTodo(id) {
    const todo_li = this.todo_list.querySelector(`li#todo_${id}`);
    todo_li.className += ' editing';
    const todo_input = todo_li.querySelector('input.edit');
    todo_input.focus();
    todo_input.selectionStart = todo_input.value.length;

    const source_title = todo_input.value;

    todo_input.onblur = () => {
      todo_input.value = source_title;
      const pos = todo_li.className.search(' editing');
      if (pos !== -1) {
        todo_li.className = todo_li.className.substr(0, pos) + todo_li.className.substr(pos + 8);
      }
    };

    todo_input.onkeyup = event => {
      if (event.keyCode === 13) {
        this.emit('edit_todo', id, todo_input.value);
      } else if (event.keyCode === 27) {
        todo_input.blur();
      }
    };
  }

  addAllListeners(todos) {
    for (let id in todos) {
      this.addOnChangeListener(id);
      this.addOnDeleteListener(id);
      this.addOnEditListener(id);
    }
  }

  addOnAddNewTodoListener() {
    const new_todo = document.querySelector('.new-todo');
    new_todo.onkeyup = event => {
      if (event.keyCode === 13) {
        const title = new_todo.value.trim();
        if (title !== '') {
          this.emit('add_new_todo', title);
          new_todo.value = '';
        }
      }
    };
  }

  addOnClearCompletedListener() {
    const clear_completed = document.querySelector('button.clear-completed');
    clear_completed.onclick = () => {
      this.emit('clear_completed');
    };
  }

  addOnToggleAllListener() {
    const toggle_all = document.querySelector('input.toggle-all');
    toggle_all.onclick = () => {
      this.emit('toggle_all', toggle_all.checked);
    };
  }


  addOnChangeListener(id) {
    this.todo_list.querySelector(`li#todo_${id} div.view input.toggle`)
      .onchange = () => this.emit('change_state', id);
  }

  addOnDeleteListener(id) {
    this.todo_list.querySelector(`li#todo_${id} div.view button.destroy`)
      .onclick = () => this.emit('delete_todo', id);
  }

  addOnEditListener(id) {
    this.todo_list.querySelector(`li#todo_${id} div.view label`)
      .ondblclick = () => this.editTodo(id);
  }
}

module.exports = TodoView;
