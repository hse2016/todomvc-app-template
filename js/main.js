'use strict';

const MainView = require('./views/main');
const BaseModel = require('./mvc_framework/base_model');

/*
new AppView(document.querySelector('section#todoapp_1'), new AppModel());
new AppView(document.querySelector('section#todoapp_2'), new AppModel());
*/

new MainView(document.querySelector('body'), new BaseModel());
