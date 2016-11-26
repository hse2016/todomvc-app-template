'use strict';

module.exports.addClass = (element, className) => {
  if (element.hasAttribute('class')) {
    const classNames = element.getAttribute('class');
    if (!classNames.includes(className)) {
      element.setAttribute('class', `${classNames} ${className}`);
    }
  } else {
    element.setAttribute('class', className);
  }
};

module.exports.removeClass = (element, className) => {
  if (element.hasAttribute('class')) {
    element.setAttribute('class', element.getAttribute('class')
      .split(' ').filter(currentClassName => currentClassName !== className).join(' '));
  }
};

module.exports.htmlToElement = (html) => {
  html = html.trim().split('').filter(char => char !== '\n').join('');

  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp;
};
