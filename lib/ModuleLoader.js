function ModuleLoader(delta, injector, Module) {
  this.delta = delta;
  this.injector = injector;
  this.Module = Module;
  this.modules = {};
}

function module(name) {
  var module = new Module(name);
  module.injector = injector.rescope({
    module: module
  });
  module.injector.add("injector", module.injector);
  return injector;
}

function getOrCreate(name) {
  if (!this.modules.hasOwnProperty(name)) {
    this.modules[name] = new this.Module();
  }
  return this.modules[name];
}

module.exports = ModuleLoader;