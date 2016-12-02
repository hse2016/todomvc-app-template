import TodosController from './todos/todosController';
import {$on} from './engine/helpers';
import TodosTemplate from './todos/todosTemplate';
import TodosStore from './todos/todosrStore';
import TodosView from './todos/todosView';

const store = new TodosStore('todos');

const template = new TodosTemplate();
const view = new TodosView(template);

const controller = new TodosController(store, view);

const setView = () => controller.setView(document.location.hash);
$on(window, 'load', setView);
$on(window, 'hashchange', setView);
