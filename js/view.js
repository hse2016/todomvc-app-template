const Handlebars = require('handlebars');

var source   = $("todo").html();
var template = Handlebars.compile(source);
var context = { todo: [{name: "first task"}, {name:"second task"}] };
var html    = template(context);
$("document").append(html);
