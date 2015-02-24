'use strict';

var mongoose = require('mongoose'),
    eat = require('eat');

var photoSchema = new mongoose.Schema({
  phoneId: String,
  photoUrl: String
});

/** -- test w/out hashing first
photoSchema.methods.generateHash = function(phoneId) {
  return bcrypt.hashSync(phoneId, bcrypt.genSaltSync(8), null);
};**/

module.exports = mongoose.model('Photo', photoSchema);