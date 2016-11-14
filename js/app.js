(function (window) {
	'use strict';

	let API = require('./api');

	let adapter = require('./localStorageAdapter');

	let lsapi = new API(new adapter());

	document.getElementById('temp-button-set').addEventListener('click', function () {
		lsapi.setItem('test-item', 'test-test');
	});

	document.getElementById('temp-button-get').addEventListener('click', function () {
		lsapi.getItem('test-item').then( function (data) {
			console.log(data);
		});
	});

})(window);
