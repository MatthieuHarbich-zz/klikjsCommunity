'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	MethodSchema = mongoose.model('Method').schema;


var ObjectSchema = new Schema({
  name: String,
  info: String,
  methods: [ MethodSchema ]
  
});

module.exports = mongoose.model('Object', ObjectSchema);