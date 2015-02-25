
'use strict';

var mongoose = require('mongoose'),
    eat = require('eat');

var photoSchema = new mongoose.Schema({
  phoneId: {type: String, required: true},
  photoUrl: String,
  up: {type: Number, default: 0},
  down: {type: Number, default: 0}
});

/** -- test w/out hashing first
photoSchema.methods.generateHash = function(phoneId) {
  return bcrypt.hashSync(phoneId, bcrypt.genSaltSync(8), null);
};**/

module.exports = mongoose.model('Photo', photoSchema);
