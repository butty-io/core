/**
 * Created by Thomas on 27.08.2015.
 */

var fs = require('fs');
var Q = require('q');

/**
 * bfs - butty-fs Class
 *
 * Promised-based API
 */
function bfs(){
  this.folderlist = undefined;
}
exports.bfs = bfs();

/**
 * Async readdir
 * @param folder
 * @returns {*|promise}
 */
bfs.prototype.readdir = function(folder){
  var self = this;
  var deferred = Q.defer();

  fs.readdir(folder, function(err, files){
    if(err) deferred.reject(err);
    deferred.resolve(files);
  });

  return deferred.promise;
};
