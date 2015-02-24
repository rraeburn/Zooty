'use strict';

var Vote = require ('../models/Vote'),
    eat_auth = require('../lib/eatAuth'),
    bodyparser = require('body-parser');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  app.post('/vote/:id', eat_auth.validateToken(appSecret), function(req, res) {
    var newVote = new Vote();
    newVote.phoneId = req.phoneId;
    newVote.photoUrl = req.body.photoUrl;
    newVote.vote = req.body.vote;
    newVote.save(function(err, data) {
      if(err) return res.status(500).send({msg: 'could not register vote'});
      res.json({msg: 'you registered ' + data.vote});
    });
  });

  
};