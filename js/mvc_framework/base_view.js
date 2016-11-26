'use strict';

const EventEmitter = require('../event_emitter');

class BaseView extends EventEmitter {
  constructor(mainElement, collection) {
    super();
    this.mainElement = mainElement;
    this.collection = collection;
  }

  setElements(elements) {
    this._elements = elements;
  }

  setEvents(events) {
    this._events = events;
  }

  setTemplate(template) {
    this.template = template;
  }

  setViews(views) {
    this._views = views;


    /*
    for (let viewName in views) {
      const [viewClass, mainElement, collection] = views[viewName];
      this.view[viewName] = new viewClass(mainElement, collection);
    }
    */
  }

  delegateViews() {
    this.views = [];
    if (this._views !== undefined) {
      this._views.forEach(({ViewClass, selector, model}) => {
        const element = this.mainElement.querySelector(selector);
        this.views.push(new ViewClass(element, model));
      });
    }
  }

  delegateElements(doc) {
    this.el = {};
    if (doc === undefined) {
      for (let element in this._elements) {
        const selector = this._elements[element];
        this.el[element] = this.mainElement.querySelector(selector);
      }
    } else {
      for (let element in this._elements) {
        const selector = this._elements[element];
        this.el[element] = doc.querySelector(selector);
      }
    }
  }

  delegateEvents(doc, id) {
    for (let name in this._events) {
      let element;
      if (this.el[name] === undefined) {
        const selector = name;
        element = doc.querySelector(selector);
      } else {
        element = this.el[name];
      }
      for (let event in this._events[name]) {
        const method = this._events[name][event];
        element.addEventListener(event, (...args) => this[method](id, element, ...args));
      }
    }
  }

  render() {
    this.mainElement.innerHTML = '';

    this.collection.forEach(item => {
      const item_tmp = document.createElement('div');
      item_tmp.innerHTML = this.template(item.id, item).trim();
      const element = item_tmp.firstChild;

      this.delegateElements(element);
      this.delegateEvents(element, item.id);
      this.mainElement.appendChild(element);
      this.delegateViews();
    });
  }
}

module.exports = BaseView;
