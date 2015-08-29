/**
 * Created by Thomas on 29.08.2015.
 */
var assert = require('chai').assert;

describe('Test: browser.js', function(){

  var path    = require('path');
  var browser = require('./../models/browser.js');
  var Bfs     = new browser.bfs();

  var _folder = path.join(__dirname, './../test-mock/');
  var _files  = ['TestFolder4', 'test1.html', 'test2.xsl', 'test3.png'];

  before(function(){
    // TODO: delete .note-folder
    // TODO: get mock-files list
  });

  describe('#cd()', function(){
    it('should set the _folder attribute:', function(){
      Bfs.cd(_folder);
      assert.equal(Bfs._folder, _folder);
    });
  });
  describe('#wherami()', function(){
    it('should return the _folder attribute, set by cd()', function(){
      assert.equal(Bfs.wherami(), _folder);
    });
  });
  describe('#ls()', function(){
    it('should list all files in '+_folder, function(){
      return Bfs.ls()
        .then(function(files){
          assert.deepEqual(files, _files); // for asserting equivalent arrays!
        });
    });
  });
});