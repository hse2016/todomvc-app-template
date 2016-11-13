/**
 * Created by tema on 12.11.16.
 */

class Router {

	constructor() {
		this.routes = [];
		this.mode = '';
		this.root = '/';
	}

	getFragment() {
		var fragment = '';
		if (this.mode === 'history') {
			fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
			fragment = fragment.replace(/\?(.*)$/, '');
			fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
		} else {
			var match = window.location.href.match(/#(.*)$/);
			fragment = match ? match[1] : '';
		}
		return this.clearSlashes(fragment);
	}

	clearSlashes(path) {
		return path.toString().replace(/\/$/, '').replace(/^\//, '');
	}

	add(re, handler) {
		if (typeof re == 'function') {
			handler = re;
			re = '';
		}
		this.routes.push({re: re, handler: handler});
		return this;
	}

	remove(param) {
		for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
			if (r.handler === param || r.re.toString() === param.toString()) {
				this.routes.splice(i, 1);
				return this;
			}
		}
		return this;
	}

	flush() {
		this.routes = [];
		this.mode = null;
		this.root = '/';
		return this;
	}

	check(f) {
		var fragment = f || this.getFragment();
		for (var i = 0; i < this.routes.length; i++) {
			var match = fragment.match(this.routes[i].re);
			if (match) {
				match.shift();
				this.routes[i].handler.apply({}, match);
				return this;
			}
		}
		return this;
	}

	listen() {
		var self = this;
		var current = self.getFragment();
		var fn = function () {
			if (current !== self.getFragment()) {
				current = self.getFragment();
				self.check(current);
			}
		}
		clearInterval(this.interval);
		this.interval = setInterval(fn, 50);
		return this;
	}

	navigate(path) {
		path = path ? path : '';
		if (this.mode === 'history') {
			history.pushState(null, null, this.root + this.clearSlashes(path));
		} else {
			window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
		}
		return this;
	}
}

module.exports = Router
