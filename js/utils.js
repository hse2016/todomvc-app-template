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
