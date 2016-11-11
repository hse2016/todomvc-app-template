/**
 * Created by tema on 11.11.16.
 */

var Artemone = require('./Artemone/Artemone');
var Todo = require('./Models/todo');
var TodoView = require('./Views/todo-view');
var AppView = require('./Views/app-view');
var EventManager = new Artemone.Events();





var todo = new Todo({'title' : 'Artem'});
var appView = new AppView();
appView.addOne(todo);














// var a = new Models({'Name' : 'Artem', 'Surname' : 'Maksimov'});
//
// var eventer = new Events();
//
// class MyView extends Views {
//
// 	render() {
// 		console.log(this.model.get('Name'));
// 	}
// }
//
// var v = new MyView();
// v.setModel(a);
//
//
// a.set({'Name' : 'Temka'});
// a.set({'Name' : 'And now Im Artem'});

