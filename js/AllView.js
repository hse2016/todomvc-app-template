/**
 * Created by dalexiv on 11/21/16.
 */
const View = require("./alexmvc/View");
module.exports = class AllView extends View {
	constructor(document, views) {
		super(document, views);
		Object.assign(this, views);

		// setup callbacks
	}
};
