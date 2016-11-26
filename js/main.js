'use strict';

const AppModel = require('./models/app');
const AppView = require('./views/app');

new AppView(document.querySelector('section#todoapp_1'), new AppModel());
new AppView(document.querySelector('section#todoapp_2'), new AppModel());
