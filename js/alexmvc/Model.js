/**
 * Created by dalexiv on 11/21/16.
 */
module.exports = class Model {
	constructor(api) {
		this.api = api;
	}

	init(view) {
		this.view = view;
	}
};
