'use strict';

let localStorage = require('./localStorageAdapter');

let adapters = [];

adapters.push(localStorage);

module.exports = adapters;
