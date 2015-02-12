'use strict';

var Injector = require('./Injector');
var ModuleLoader = require('./core/ModuleLoader');

function Delta() {
  this.injector = new Injector();
  this.injector.add("delta", this);
  this.injector.add("injector", this.injector));
  var modules = new ModuleLoader();
}

module.exports = Delta;