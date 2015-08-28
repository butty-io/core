/**
 * Created by Thomas on 27.08.2015.
 */
var fs = require('fs');
var Q = require('q');

/**
 * Bfs - butty-fs Class
 *
 * Promised-based API
 */
function Bfs(){
  this._folder = undefined; // current folder
}
exports.bfs = Bfs;

Bfs.prototype.cd = function(path){
  // TODO assert path
  this._folder = path;
};


Bfs.prototype.wherami = function(){
  return this._folder;
};

Bfs.prototype.ls = function(){
  var self = this;
  var deferred = Q.defer();

  fs.readdir(self._folder, function(err, files){
    if(err) deferred.reject(err);
    deferred.resolve(files);
  });

  return deferred.promise;
};