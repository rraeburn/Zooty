'use strict';

var Photo = require('../models/Photo'),
    eat_auth = require('../lib/eatAuth'),
    bodyparser = require('body-parser');

module.exports = function(app, appSecret) {
  app.use(bodyparser);
  
  app.post('/upload', eat_auth.validateToken(appSecret), function(req,res) {
    var newPhoto = new Photo();
    newPhoto.phoneId = req.header.phoneId || req.body.phoneId;
    newPhoto.photoUrl = req.body.photoUrl;
    newPhoto.save(function(err, data) {
      if(err) return res.status(500).send({msg: 'could not upload photo'});

      res.status(200).send({msg: 'photo uploaded', img: data.photoUrl });
    });
  });

  app.get('/stats', eat_auth.validateToken(appSecret), function(req, res) {
    Photo.find({phoneId: req.body.phoneId}, function(err, data) {
      if(err) return res.status(500).send({msg: 'could not find photo'});

      res.json(data);
    });
  });

  app.post('/home', function(req, res) {
    eat_auth.generateToken((req.header.phoneId || req.body.phoneId), appSecret, function (err, data) {
      if (err) return res.status(500).send({msg: 'could not generate token'});

      res.json({token: data});
    });
  });

  app.get('/vote', eat_auth.validateToken(appSecret), function(req, res) {
    Photo.find({}, function(err, data) {
      if(err) return res.status(500).send({msg: 'could not get photos'});

      res.json(data);
    });
  });

  app.put('/vote/:id', eat_auth.validateToken(appSecret), function(req, res) {
    var updatedPhoto = req.body;
    delete updatedPhoto._id;
    if (updatedPhoto.votes.up) {
      updatedPhoto.votes.upTally += 1;
    } else {
      updatedPhoto.votes.downTally += 1;
    }
    Photo.update({_id: req.params.id}, updatedPhoto, function(err) {
      if (err) return res.status(500).send({msg: 'could not vote'});
    });
  });
};