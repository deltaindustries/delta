"use strict";

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
  try {
    var result = this.registrants[name]();
    callback(null, result);
  }
  catch(e) {
    callback(e);
  }
}

module.exports = Injector;