/**
 * Created by dalexiv on 11/20/16.
 */
module.exports = class Controller {
	constructor(router, view, model) {
		this.router = router;
		this.view = view;
		this.model = model;
	}

	openPage() {
		this.model.init(this.view);
	}
};
