'use strict';

var mongoose = require ('mongoose'),
    eat = require ('eat');

var voteSchema = new mongoose.Schema({
  userId: String,
  photoUrl: String,
  registeredVote: String
});

module.exports = mongoose.model('Vote', voteSchema);