'use strict';

var _ = require('lodash');
var Addon = require('./addon.model');
var Github = require('github');
var github = new Github({
  version: "3.0.0"
});
// Get list of addons
exports.index = function(req, res) {
  // var repo = github.getRepo("MatthieuHarbich", "ice2");  
  // repo.show(function(err, repo){
  //   return res.json(repo);
    
  // })
};

// Get a single addon
exports.show = function(req, res) {
  Addon.findById(req.params.id, function (err, addon) {
    if(err) { return handleError(res, err); }
    if(!addon) { return res.send(404); }
    return res.json(addon);
  });
};

// Creates a new addon in the DB.
exports.create = function(req, res) {
  Addon.create(req.body, function(err, addon) {
    if(err) { return handleError(res, err); }
    return res.json(201, addon);
  });
};

// Updates an existing addon in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Addon.findById(req.params.id, function (err, addon) {
    if (err) { return handleError(res, err); }
    if(!addon) { return res.send(404); }
    var updated = _.merge(addon, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, addon);
    });
  });
};

// Deletes a addon from the DB.
exports.destroy = function(req, res) {
  Addon.findById(req.params.id, function (err, addon) {
    if(err) { return handleError(res, err); }
    if(!addon) { return res.send(404); }
    addon.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}