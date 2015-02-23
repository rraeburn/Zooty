'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    eat = require('eat');

var photoSchema = new mongoose.Schema({
  phoneId: String,
  photoUrl: String,
  votes : {
    up: Number,
    down: Number
  }
});

/** -- test w/out hashing first
photoSchema.methods.generateHash = function(phoneId) {
  return bcrypt.hashSync(phoneId, bcrypt.genSaltSync(8), null);
};**/


photoSchema.methods.generateToken = function(appSecret, callback) {
  eat.encode({id: this.phoneId}, appSecret, callback);
};

module.exports = mongoose.model('Photo', photoSchema);