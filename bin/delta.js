"use strict";

var Delta = require("../lib/Delta");
var path = require("path");

module.exports = function() {
  var delta = new Delta();
  var appDir = path.dirname(require.main.filename);
  delta.run(function(ModuleFolder){
    ModuleFolder.loadAll(path.join(appDir,"modules"));
  });
  return delta;
}