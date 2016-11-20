'use strict';

const EventEmitter = require('../event_emitter');

class BaseView extends EventEmitter {
  constructor(mainElement, collection) {
    super();
    this.mainElement = mainElement;
    this.collection = collection;
  }

  setElements(elements) {
    this.el = {};
    for (let element in elements) {
      const selector = elements[element];
      this.el[element] = this.mainElement.querySelector(selector);
    }
  }

  setEvents(events) {
    this._events = events;
  }

  setTemplate(template) {
    this.template = template;
  }

  setViews(views) {
    this.view = {};
    for (let viewName in views) {
      const [viewClass, mainElement, collection] = views[viewName];
      this.view[viewName] = new viewClass(mainElement, collection);
    }
  }

  delegateEvents(element, id) {
    if (element === undefined) {
      for (let element in this._events) {
        for (let event in this._events[element]) {
          if (this.el[element] !== undefined) {
            const method = this._events[element][event];
            this.el[element].addEventListener(event, (...args) => this[method](...args));
          }
        }
      }
    } else {
      for (let selector in this._events) {
        for (let event in this._events[selector]) {
          if (this.el === undefined || this.el[selector] === undefined) {
            const method = this._events[selector][event];
            element.querySelector(selector)
              .addEventListener(event, (...args) => this[method](id, element, ...args));
          }
        }
      }
    }
  }

  render() {
    while (this.mainElement.firstChild) {
      this.mainElement.removeChild(this.mainElement.firstChild);
    }

    const data = this.collection.getData();
    data.forEach(item => {
      const item_tmp = document.createElement('div');
      item_tmp.innerHTML = this.template(item.id, item).trim();
      const element = item_tmp.firstChild;

      this.delegateEvents(element, item.id);
      this.mainElement.appendChild(element);
    });
  }
}

module.exports = BaseView;
