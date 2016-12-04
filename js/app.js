(function () {
	const Artemone = require('./Artemone/Artemone');
	const AppView = require('./Views/App-view');
	const AppModel = require('./Models/App');
	const Lists = require('./Collections/Lists');
	const router = new Artemone.Router();

	// const appModel = new AppModel({ title: 'aTodos' });

	const appView = new AppView();
	const lists = new Lists();
	lists.setName('lists');
	appView.attach('.lists').setModel(lists);

	appView.model.load().then((result) => {
			result.loadTodos();
		},
		(error) => {
			const appModel = new AppModel({ title: 'Todos' });
			appView.model.add(appModel);
			console.log(error);
		});


	const add_list = document.querySelector('.add-list');

	function addList() {
		const newAppModel = new AppModel({ title: 'Todos' });
		appView.model.add(newAppModel);
		appView.model.loadTodo(newAppModel);
	}

	add_list.addEventListener('click', addList);

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
