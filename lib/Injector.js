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

Injector.prototype.resolve = function(name, callback) {
  if (!this.registrants.hasOwnProperty(name)){
    return callback(new Error("Dependency '" + name + "' not found"));
  }
  var func = this.registrants[name];
  try {
    var dep = this.registrants[name]();
  }
  catch(e) {
    return callback(e);
  }
  if (!callback) {
    if (dep instanceof Promise) {
      return dep;
    }
    return new Promise(function(resolve,reject){
      resolve(dep);
    });
  }
  if (dep instanceof Promise) {
    dep.then(function(result){
      callback(null, result);
    }, callback);
  }
  callback(null, dep);
  try {
    callback(null, result);
  }
}

Injector.prototype.inject = function(func) {
  var deps = introspect(func);
  var promises = [];

  for (var i in deps) {
    promises.push(new Promise(){
      
    });
  }
}

module.exports = Injector;