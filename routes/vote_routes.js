'use strict';

var Vote = require ('../models/Vote'),
    Photo = require('../models/Photo'),
    eat_auth = require('../lib/eatAuth'),
    bodyparser = require('body-parser');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  app.post('/vote/:id', eat_auth.validateToken(appSecret), function(req, res) {
      var newVote = new Vote();
      newVote.userId = req.phoneId;
      newVote.photoUrl = req.body.photoUrl;
      newVote.registeredVote = req.body.registeredVote;
      newVote.save(function(err, data) {
        if(err) return res.status(500).send({msg: 'could not register vote'});
        Vote.count({photoUrl: newVote.photoUrl, registeredVote: data.registeredVote}, function(err, data) {
          if(err) return res.status(500).send({msg: 'could not register vote'});
          
          if (newVote.registeredVote == 'up') {
            Photo.update({photoUrl: newVote.photoUrl}, {up : data}, function(err, result) {
            });
          } else {
            Photo.update({photoUrl: newVote.photoUrl}, {down : data}, function(err, result) {
            });
          }
        });
        res.json({msg: 'you registered ' + data.registeredVote});
      });
  });
};