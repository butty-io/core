/**
 * Created by Thomas on 27.08.2015.
 */

var fs  = require('fs');
var path= require('path');
var Q   = require('q');
var CONFIGPATH = './../config.js';

function Bnote(){
  this.files = undefined;
}
exports.bnote = Bnote;

Bnote.prototype.create = function(note, file){
  var self = this;
  var deferred = Q.defer();

  var notefile = path.join(path.dirname(file), config.notesFolder ,self._noteName(path.basename(file)));

  fs.appendFile(notefile, note, function(err){
    if(err) deferred.reject(err);
    deferred.resolve();
  });

  return deferred.promise;
};

Bnote.prototype._noteName = function(filename){
  var config = require(CONFIGPATH);

  return path.join(config.notesPrefix + filename + config.notesSuffix);
};

Bnote.prototype._checkNotesFolder = function(file){
  var self = this;
  var config = require(CONFIGPATH);

  var notesFolder = path.join(path.basename(file), config.notesFolder);
  self._exists(notesFolder)
    .then(function(exists){
      if(!exists){
        
      }
    })
};

Bnote.prototype._exists = function(path){
  var self = this;
  var deferred = Q.defer();

  fs.exists(path, function(exists){
    deferred.resolve(exists);
  });

  return deferred.promise;
};
