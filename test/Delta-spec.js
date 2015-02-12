var Delta = require('../lib/Delta');
describe('Delta', function(){

  it('constructs', function(){
    var delta = new Delta();
    delta.should.be.a('Delta')
  }

});