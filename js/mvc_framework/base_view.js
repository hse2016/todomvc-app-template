'use strict';

const EventEmitter = require('../event_emitter');
const Utils = require('../utils');

class BaseView extends EventEmitter {
  constructor(mainElement, collection) {
    super();
    this.mainElement = mainElement;
    this.collection = collection;
  }

  setElements(elements) {
    this._elements = elements;
    return this;
  }

  setEvents(events) {
    this._events = events;
    return this;
  }

  setTemplate(template) {
    this._template = template;
    return this;
  }

  setViews(views) {
    this._views = views;
    return this;
  }

  _delegateViews() {
    this.views = [];
    if (this._views !== undefined) {
      this._views.forEach(({ViewClass, selector, model}) => {
        const element = this.mainElement.querySelector(selector);
        this.views.push(new ViewClass(element, model));
      });
    }
  }

  _delegateElements(doc) {
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

  _delegateEvents(doc, id) {
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
      const template = this._template(item.id, item);
      const element = Utils.htmlToElement(template);

      this._delegateElements(element);
      this._delegateEvents(element, item.id);
      while (element.firstChild) {
        this.mainElement.appendChild(element.firstChild);
      }
      this._delegateViews();
    });
  }
}

module.exports = BaseView;
