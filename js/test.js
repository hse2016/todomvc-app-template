/**
 * Created by tema on 11.11.16.
 */

var Events = require('./Events');
var Models = require('./Model');
var Views = require('./View');

var a = new Models({'Name' : 'Artem', 'Surname' : 'Maksimov'});

var eventer = new Events();

class MyView extends Views {

	render() {
		console.log(this.model.get('Name'));
	}
}

var v = new MyView();
v.setModel(a);


a.set({'Name' : 'Temka'});
a.set({'Name' : 'And now Im Artem'});

