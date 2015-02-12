var Injector = require('../lib/Injector');

describe('Injector', function() {

  beforeEach(function() {
    this.injector = new Injector();
  });

  it('can add a dependency', function(){
    this.injector.register('foo', {});
  });

});