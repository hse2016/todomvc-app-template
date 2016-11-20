'use strict';

const TodoCollection = require('./collections/todo');
const AppView = require('./views/app');
new AppView(document, new TodoCollection());
