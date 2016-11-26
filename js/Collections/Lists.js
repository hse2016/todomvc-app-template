/**
 * Created by tema on 11.11.16.
 */

const Artemone = require('./../Artemone/Artemone');
const App = require('./../Models/App');
const LocalStorage = require('./../Artemone/LocalStorage');
const Todos = require('./../Collections/Todos');
const ListView = require('./../Views/List-view');

class Lists extends Artemone.Collection {

	constructor() {
		super();
		this.initialize();
		this.name = 'Lists';
		this.storage = new LocalStorage();
		this.maxID = 0;
	}

	initialize() {
		this.listenTo(this, 'change', this.save, this);
		this.listenTo(this, 'add', this.setUniqueID, this);
		// this.listenTo(this, 'add', this.loadTodo, this);
		this.model = App;
	}

	setUniqueID(e, model) {
		if (model.get('id') >= this.maxID) {
			this.maxID = model.get('id') + 1;
		} else if (!model.get('id')) {
			model.set({ id : this.maxID++ });
		}
	}

	delete(e, id) {
		this.removeAll(this.where({ id: id }));
	}

	loadTodosArray(models) {
		for (const i in models) {
			const id = models[i].get('id');
			const todosList = new Todos();
			const listView = new ListView(id);
			listView.setModel(todosList)
				.setName(`todolist${id}`)
				.setElement(`.todoapp#todoList-${id}`)
				.render()
				.events();

			this.listenTo(listView.model, 'destroy', this.delete, this);
			this.listenTo(this, 'add', listView.events, listView);

			listView.model.load().then(() => {
				console.log('ok');
			}).catch(() => {
				console.log('not ok');
			});
		}
	}

	loadTodos() {
		this.loadTodosArray(this.models);
	}

	loadTodo(model)	{
		this.loadTodosArray([model]);
	}
}

module.exports = Lists;
