'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    eat = require('eat');

var photoSchema = new mongoose.Schema({
  phoneId: String,
  photoUrl: String,
  votes : {
    up: {type: Boolean, default: false},
    down: {type: Boolean, default: false},
    upTally: {type: Number, min: 0},
    downTally: {type: Number, min: 0}
  }
});

/** -- test w/out hashing first
photoSchema.methods.generateHash = function(phoneId) {
  return bcrypt.hashSync(phoneId, bcrypt.genSaltSync(8), null);
};**/

module.exports = mongoose.model('Photo', photoSchema);