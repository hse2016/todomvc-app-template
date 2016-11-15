(function(window, document) {
  'use strict';

  function findOneElement(cssSelector) {
    return document.querySelector(cssSelector);
  }

  function findAllElements(cssSelector) {
    return document.querySelectorAll(cssSelector);
  }

  const LocalStorage = require('./LocalStorage');

  let writeToLocalStorage;
  let readFromLocalStorage;
  let removeInLocalStorage;

  function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
      return false;
    }
  }

  if (supportsLocalStorage()) {
    writeToLocalStorage = function(id, item) {
      window.localStorage.setItem(id, item);
    };

    readFromLocalStorage = function(id) {
      return window.localStorage.getItem(id);
    };

    removeInLocalStorage = function(id) {
      window.localStorage.removeItem(id);
    };
  } else {
    let ls = new LocalStorage();
    writeToLocalStorage = function(id, item) {
      ls.setItem(id, item);
    };

    readFromLocalStorage = function(id) {
      return ls.getItem(id);
    };

    removeInLocalStorage = function(id) {
      ls.removeItem(id);
    };
  }

  module.exports = {
    writeToLocalStorage: writeToLocalStorage,
    readFromLocalStorage: readFromLocalStorage,
    removeInLocalStorage: removeInLocalStorage,
    findOneElement: findOneElement,
    findAllElements: findAllElements
  };
})(window, document);
