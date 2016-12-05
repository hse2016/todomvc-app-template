(function () {
	const Artemone = require('./Artemone/Artemone');
	const AppView = require('./Components/AppList/AppView');
	const AppModel = require('./Components/AppList/App');
	const Lists = require('./Components/AppList/AppCollection');
	const router = new Artemone.Router();

	// Главное View приложения
	const appView = new AppView();
	const lists = new Lists();
	lists.setName('lists');
	appView.attach('.lists').setModel(lists);
	appView.model.load();


	// Добавление новых вью
	function addList() {
		const newAppModel = new AppModel({ title: 'Todos' });
		appView.model.add(newAppModel);
		appView.model.loadTodo(newAppModel);
	}
	const add_list = document.querySelector('.add-list');
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
