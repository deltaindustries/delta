"use strict";

var introspect = require("introspect");

function Injector() {
  this.registrants = {};
}

Injector.prototype.register = function(name, factory) {
  if (typeof factory !== "function") {
    throw new Error("'"+ name + "' - factory must return a dependency");
  }
  this.registrants[name] = factory;
}

Injector.prototype.resolve = function(name) {
  if (!this.registrants.hasOwnProperty(name)){
    return callback(new Error("Dependency '" + name + "' not found"));
  }
  var func = this.registrants[name];
  try {
    var dep = this.registrants[name]();
    return dep;
  }
  catch(e) {
    return callback(e);
  }
}

Injector.prototype.argumentsFor = function(func, instance) {
  var deps = introspect(func);
  var args = [];
  for (var i in deps) {
    args.push(this.resolve(deps[i]));
  }
  return args;
}

Injector.prototype.inject = function(func, instance) {
  return func.apply(instance, this.argumentsFor);
}

Injector.prototype.wrap = function(func, instance) {
  var args = this.argumentsFor(func);
  return function() {
    return func.apply(instance, args);
  }
}

Injector.prototype.construct = function(cons) {
  // http://stackoverflow.com/questions/3362471/how-can-i-call-a-javascript-constructor-using-call-or-apply
  // Adapted for injection
  var Temp = function(){};
  Temp.prototype = cons.prototype;
  var inst = new Temp;
  var ret = cons.apply(inst, this.argumentsFor(cons));
  return Object(ret) === ret ? ret : inst;
}

module.exports = Injector;