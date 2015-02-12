"use strict";

var Injector = require("./Injector");
var ModuleLoader = require("./ModuleLoader");
var Module = require("./Module");

function Delta() {
  this.injector = new Injector();
  this.injector.register("delta", this);
  this.injector.register("injector", this.injector);
  this.injector.register("Module", Module);
  this.modules = this.injector.construct(ModuleLoader);
  this.injector.register("modules", modules);
}

Delta.prototype.module = function(name) {
  return this.modules.getOrCreate(name);
}

Delta.prototype.run = function(func) {
  return this.injector.inject(func);
}

module.exports = Delta;