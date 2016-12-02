import {ItemList} from './item';
import {qs, $on, $delegate} from './helpers';


const _itemId = element => parseInt(element.parentNode.dataset.id, 10);
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default class View {

	constructor(template) {
		this.template = template;
	}
}
