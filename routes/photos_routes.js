'use strict';

var Photo = require('../models/Photo'),
    eat_auth = require('../lib/eatAuth'),
    fs = require('fs'),
    bodyparser = require('body-parser');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());
  
  app.post('/upload', eat_auth.validateToken(appSecret), function(req,res) {
    var newPhoto = new Photo();
    newPhoto.phoneId = req.phoneId;
    fs.writeFileSync('./public/'+ newPhoto._id + '.jpg', req.body.photoFile, 'utf8');
    newPhoto.photoUrl = 'http://zooty.herokuapp.com/public/' + newPhoto._id + '.jpg';
    newPhoto.save(function(err, data) {
      if(err) return res.status(500).send({msg: 'could not upload photo'});

      res.status(200).send({msg: 'photo uploaded', img: data.photoUrl});
    });
  });

  app.get('/stats', eat_auth.validateToken(appSecret), function(req, res) {
    Photo.find({}, function(err, data) {
      if(err) return res.status(500).send({msg: 'could not find photo'});

      res.json(data);
    });
  });

  app.post('/home/:phoneId', function(req, res) {
    if(!(req.params.phoneId.length === 36)) return res.status(500).send({msg: 'could not generate token'});
      eat_auth.generateToken(req.params.phoneId, appSecret, function (err, data) {
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
};