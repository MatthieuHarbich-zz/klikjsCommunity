'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MethodSchema = new Schema({
  name: String,
  parameters: [String],
  _object: {type: Schema.Types.ObjectId, ref: 'Object' }
});

module.exports = mongoose.model('Method', MethodSchema);