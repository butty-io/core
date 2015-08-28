/**
 * Butty V0.0.1
 */
var path = require('path');

var browser = require('./models/browser.js');
var Bfs = new browser.bfs();

var notes = require('./models/notes.js');
var Bnote = new notes.bnote();

var root = './test/mock';

//Bfs.readdir(root)
//  .then(function(files){
//    console.log(files);
//
//    var file = path.join(root,files[0]);
//
//    return bnotes.addNote('Testnotiz', file);
//  })
//  .then(console.log)
//  .fail(console.log);

var localFolder = path.join(__dirname, 'test-mock');
Bfs.cd(localFolder);

Bfs.ls()
  .then(function(files){
    console.log(files);

    var file = path.join(Bfs.wherami(), files.pop());
    return Bnote.create('Das ist eine Testnotiz', file);
  })
  .fail(function(err){
    console.log('promise:fail:',err);
  });

