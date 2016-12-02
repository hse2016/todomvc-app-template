class routing {    
    back() {
        window.history.back();
    }
    
    forward() {
        window.history.forward();
    }
    
    go(where) {
        window.history.go(where);
    }
    
}
module.exports = routing
