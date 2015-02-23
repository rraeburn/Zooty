'use strict';

var eat = require('eat'),
    Photo = require('../models/Photo');

var Token = module.exports = {};

Token.prototype.validateToken = function(appSecret) {
  return function(req, res, next) {
    var token = req.headers.token || req.body.token;
    if(!token) return res.status(403).send({msg: 'could not authenticate'});

    eat.decode(token, appSecret, function(err, decoded) {
      if(err) return res.status(403).send({msg: 'could not authenticate'});

      Photo.findOne({phoneId: decoded.id}, function(err, phoneId) {
        if(err) return res.status(403).send({msg: 'could not authenticate'});

        if(!phoneId) return res.status(403).send({msg: 'could not authenticate'});

        req.phoneId = phoneId;
        next();
      });
    });
  };
};

Token.prototype.generateToken = function (phoneId, appSecret, callback) {
  eat.encode({id: phoneId}, appSecret, callback);
};