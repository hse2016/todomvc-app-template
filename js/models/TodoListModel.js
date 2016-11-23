import {Model, fieldsS, verboseNameS} from 'FKM';

class TodoListModel extends Model {
  constructor(fields, id) {
    if (!(fields.show === 'All' || fields.show === "Active" ||
          fields.show === "Completed"))
      fields.show = 'All';
    super(fields, id);
    this[fieldsS].todos = fields.todos || {};
  }

  static get _fields() {
    return {
      show: String,        // 'All|Active|Completed'
      todoCounter: Number  // 0
    };
  }

  addTodo(title) {
    let todoCounter = this.todoCounter++;

    let todoObject = {title: title, completed: false, id: todoCounter};

    this[fieldsS].todos[todoCounter] = todoObject;
    TodoListModel.emit(
        `change#${this[verboseNameS]}#${this.id}`, {value: todoObject});
    return todoObject;
  }

  get todos() {
    return this[fieldsS].todos;
  }
}


// Object.defineProperty(TodoListModel.prototype, 'tmp', {
//   get: function() { ; return this[fieldsS]['tmp']; },
//   set: function(value) {
//     // TODO: generate set event
//     this[fieldsS]['tmp'] = value;
//     return value;
//   },
//   enumerable: true,
//   configurable: true
// });


Model.register(TodoListModel, "TodoList");

export {TodoListModel};
