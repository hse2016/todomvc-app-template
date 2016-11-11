(function (window) {
	'use strict';

	var Artemone = require('./Artemone');

	var a = new Artemone.Models({'Name' : 'Artem', 'Surname' : 'Maksimov'});
	var EventManager = new Artemone.Events();

	class MyView extends Artemone.Views {

		render() {
			for(var i = 0; i < this.el.length; i++) {
				this.el[i].innerHTML = this.model.get('Name');
			}
		}
	}

	var v = new MyView();
	v.setElement('.header h1');
	v.setModel(a);



	a.set({'Name' : 'Temka'});
	a.set({'Name' : 'And now Im Artem'});
	a.set({'Name' : 'arrrrtem'});


	// Your starting point. Enjoy the ride!
	// Write npm run watch-js to start coding

})(window);
