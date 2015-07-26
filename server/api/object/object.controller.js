'use strict';

var _ = require('lodash');
var Object1 = require('./object.model');


// Get list of objects
exports.index = function(req, res) {
  Object1.find(function (err, objects) {
    if(err) { return handleError(res, err); }
    return res.json(200, objects);
  });
};

// Get a single object
exports.show = function(req, res) {
  Object1.findById(req.params.id, function (err, object) {
    if(err) { return handleError(res, err); }
    if(!object) { return res.send(404); }
    return res.json(object);
  });
};

// Creates a new object in the DB.
exports.create = function(req, res) {
  Object1.create(req.body, function(err, object) {
    if(err) { return handleError(res, err); }
    return res.json(201, object);
  });
};

// Updates an existing object in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Object1.findById(req.params.id, function (err, object) {
    if (err) { return handleError(res, err); }
    if(!object) { return res.send(404); }
    var updated = _.merge(object, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, object);
    });
  });
};

// Deletes a object from the DB.
exports.destroy = function(req, res) {
  Object1.findById(req.params.id, function (err, object) {
    if(err) { return handleError(res, err); }
    if(!object) { return res.send(404); }
    object.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}