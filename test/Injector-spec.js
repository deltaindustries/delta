var Injector = require("../lib/Injector");

describe("Injector", function() {

  beforeEach(function() {
    this.injector = new Injector();
  });

  it("can add a dependency", function(){
    this.injector.register("foo", function(){});
  });

  it("resolves a dependency", function(cb){
    var dep = {};
    this.injector.register("foo", function(){ return dep; });
    this.injector.resolve("foo", function(err,result){
      if (err) return cb(err);
      result.should.equal(dep);
      cb();
    });
  });

  it("injects into a function");

});