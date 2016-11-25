/**
 * Created by tema on 19.11.16.
 */

const Artemone = require('./../Artemone/Artemone');

class AppView extends Artemone.Views {

	initialize() {
		this.setTemplate('#todoapp');
	}

	render() {
		this.el.innerHTML = this.template(this.model.attributes);
	}

}

module.exports = AppView;
