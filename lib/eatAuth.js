'use strict';

var eat = require('eat'),
    Photo = require('../models/Photo');

var Token = function(){};

Token.prototype.validateToken = function(appSecret) {
  return function(req, res, next) {
    var token = req.headers.token || req.body.token;
    if(!token) return res.status(300).send({msg: 'could not authenticate1'});

    eat.decode(token, appSecret, function(err, decoded) {
      if(err) return res.status(403).send({msg: 'could not authenticate2'});
        
        req.phoneId = decoded.id;
        next();
    });
  };
};

Token.prototype.generateToken = function (phoneId, appSecret, callback) {
  eat.encode({id: phoneId}, appSecret, callback);
};

module.exports = new Token();