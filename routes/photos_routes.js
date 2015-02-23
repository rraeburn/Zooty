'use strict';

var Photo = require('../models/Photo'),
    eat_auth = require('../lib/eatAuth'),
    bodyparser = require('body-parser');

module.exports = function(app, appSecret) {
  app.use(bodyparser);
  
  app.post('/upload', eat_auth(appSecret), function(req,res) {
    var newPhoto = new Photo();
    newPhoto.phoneId = req.header.phoneId || req.body.phoneId;
    newPhoto.photoUrl = req.body.photoUrl;
    newPhoto.save(function(err, data) {
      if(err) return res.status(500).send({msg: 'could not upload photo'});

      res.status(200).send({msg: 'photo uploaded', img: data.photoUrl });
    });
  });

  app.get('/stats', function(req, res) {
    Photo.find({phoneId: req.body.phoneId}, function(err, data) {
      if(err) return res.status(500).send({msg: 'could not find photo'});

      res.json(data);
    });
  });

};