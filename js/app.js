(function () {
	const Artemone = require('./Artemone/Artemone');
	const ListView = require('./Views/List-view');
	const AppView = require('./Views/App-view');
	const AppModel = require('./Models/App');
	const Todos = require('./Collections/Todos');
	const router = new Artemone.Router();

	const appModel = new AppModel({ title: 'aTodos' });

	const todosList1 = new Todos();
	const todosList2 = new Todos();

	const appView1 = new AppView();
	appView1.setModel(appModel)
		.setElement('#first')
		.render();

	const appView2 = new AppView();
	appView2.setModel(appModel)
		.setElement('#second')
		.render();


	const listView1 = new ListView();
	listView1.setModel(todosList1)
		.setName('todolist1')
		.setElement('#first .todoapp')
		.render()
		.events();

	if (listView1.model.load() === false) {
		listView1.render();
	}

	const listView2 = new ListView();
	listView2.setModel(todosList2)
		.setName('todolist2')
		.setElement('#second .todoapp')
		.render()
		.events();

	if (listView2.model.load() === false) {
		listView2.render();
	}


	router
		.add(/completed/, () => {
			// listView1.setTodoFilter('completed');
		})
		.add(/active/, () => {
			// listView1.setTodoFilter('active');
		})
		.add(() => {
			// listView1.setTodoFilter('');
		})
		.listen();

	router.navigate('/');
}());
