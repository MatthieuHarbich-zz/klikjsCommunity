'use strict';

var _ = require('lodash');
var Method = require('./method.model');

// Get list of methods
exports.index = function(req, res) {
  Method.find(function (err, methods) {
    if(err) { return handleError(res, err); }
    return res.json(200, methods);
  });
};

// Get a single method
exports.show = function(req, res) {
  Method.findById(req.params.id, function (err, method) {
    if(err) { return handleError(res, err); }
    if(!method) { return res.send(404); }
    return res.json(method);
  });
};

// Creates a new method in the DB.
exports.create = function(req, res) {
  Method.create(req.body, function(err, method) {
    if(err) { return handleError(res, err); }
    return res.json(201, method);
  });
};

// Updates an existing method in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Method.findById(req.params.id, function (err, method) {
    if (err) { return handleError(res, err); }
    if(!method) { return res.send(404); }
    var updated = _.merge(method, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, method);
    });
  });
};

// Deletes a method from the DB.
exports.destroy = function(req, res) {
  Method.findById(req.params.id, function (err, method) {
    if(err) { return handleError(res, err); }
    if(!method) { return res.send(404); }
    method.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}