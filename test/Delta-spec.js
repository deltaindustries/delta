require('./spec-helper.js');
var Delta = require('../lib/Delta');

describe('Delta', function(){

  it('constructs', function(){
    (function(){
      var delta = new Delta();
    }).should.not.throw();
  });

  describe('providers', function(){
    
  });

});