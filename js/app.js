'use strict';

const TodoCollection = require('./collections/todo');
const AppView = require('./views/app');
new AppView(document.querySelector('section#todoapp_1'), new TodoCollection());
new AppView(document.querySelector('section#todoapp_2'), new TodoCollection());
