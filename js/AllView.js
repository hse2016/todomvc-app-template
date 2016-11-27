/**
 * Created by dalexiv on 11/21/16.
 */

import { View } from './alexmvc/View';

module.exports = class AllView extends View {
  constructor(document, controller, views) {
    super(document, controller, views);
    Object.assign(this, views);
    console.log(this.edittext);

    this.edittext.addEventListener('keypress', function (event) {
      const key = event.which || event.keyCode;
      if (key == 13) {
        console.log(this.edittext);
        controller.onEditTextSubmitted(this.edittext.value);
      }
    });
  }

  setupListeners(eventBus) {
		// setup model to view callbacks
    eventBus.addEventHandler('updateCounter', function (value) {
      this.counter.innerHTML = value.toString();
    });
  }
};
