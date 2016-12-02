class local-storage {    
    keep(name, content) {
        window.localStorage.setItem(name, content);
        return true;
    }
    
    load(name) {
        return localStorage.getItem(name);
    }
    
    remove(name) {
        return localStorage.removeItem(name);
    }
}
module.exports = local-storage
