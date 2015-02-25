'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    voteRoutes = require('./routes/vote_routes'),
    photosRoutes = require('./routes/photos_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/photos_dev');

var app = express();
app.set('appSecret', process.env.SECRET || 'photosphotosphotos');

var photosRouter = express.Router(),
    voteRouter = express.Router();

photosRoutes(photosRouter, app.get('appSecret'));
voteRoutes(voteRouter, app.get('appSecret'));

app.use('/api/v1', photosRouter);
app.use('/api/v1', voteRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on ' + (process.env.PORT || 3000));
});