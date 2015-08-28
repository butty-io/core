/**
 * Created by Thomas on 27.08.2015.
 */

var fs  = require('fs');
var path= require('path');
var Q   = require('q');
var config = require('./../config.js');

function Bnote(){
  //this.files = undefined;
}
exports.bnote = Bnote;

Bnote.prototype.add = function(note, file){
  var self = this;

  var noteFolder = path.join(path.dirname(file), config.noteFolder);
  var noteFile   = path.join(noteFolder, self._noteName(file));

  return self._checkNotesFolder(noteFolder)
    .then(function(){
      return self._appendFile(noteFile, note);
    });
};

Bnote.prototype._noteName = function(filename){
  return path.join(config.notePrefix + path.basename(filename) + config.noteSuffix);
};

Bnote.prototype._checkNotesFolder = function(path){
  var self = this;

  return self._exists(path)
    .then(function(exists){
      if(!exists){
        return self._mkdir(path);
      }
    });
};

Bnote.prototype._exists = function(path){
  var deferred = Q.defer();

  fs.exists(path, function(exists){
    deferred.resolve(exists);
  });

  return deferred.promise;
};

Bnote.prototype._appendFile = function(file, msg){
  var deferred = Q.defer();

  fs.appendFile(file, msg, function(err){
    if(err) deferred.reject(err);
    deferred.resolve();
  });

  return deferred.promise;
};

Bnote.prototype._mkdir = function(path){
  var deferred = Q.defer();

  fs.mkdir(path, function(err){
    if(err) deferred.reject(err);
    deferred.resolve();
  });

  return deferred.promise;
};