/**
 * Created by dalexiv on 11/21/16.
 */
const Model = require("./alexmvc/Model");
module.exports = class AllModel extends Model {
	init(view) {
		super.init(view);

		view.views.counter.innerHTML = "5";
	}
};
