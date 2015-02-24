'use strict';

process.env.MONGO_URI = 'mongodb://localhost/photos_test';
require('../server.js');

var chai = require('chai'),
    chaihttp = require('chai-http'),
    mongoose = require('mongoose');

chai.use(chaihttp);

var expect = chai.expect;

describe('zooty api endpoints', function() {
  var testToken;
  
  before(function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/home')
    .send({phoneId: '123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      testToken = res.body.token;
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should respond to upload post', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/upload')
    .send({token: testToken, photoUrl: 'test IT', phoneId: '123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('_id');
      expect(res.body.photoUrl).to.eql('test IT');
      expect(res.body.phoneId).to.eql('test');
      done();
    });
  });

  it('should get photos', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/vote')
    .send({token: testToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body[0]).to.have.property('photoUrl');
      done();
    });
  });

});

