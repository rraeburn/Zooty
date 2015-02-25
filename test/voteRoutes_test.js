'use strict';

process.env.MONGO_URI = 'mongodb://localhost/votes_test';
require('../server.js');

var chai = require('chai'),
    chaihttp = require('chai-http'),
    mongoose = require('mongoose');

chai.use(chaihttp);

var expect = chai.expect;

describe('vote route end points', function() {
  var testToken,
      testUrl,
      testId;

  before(function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/home')
    .send({phoneId: '123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('token');
      testToken = res.body.token;
      done();
    });
  });

  before(function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/stats')
    .send({token:testToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      testId = res.body._id;
      done();
    });
  });

  before(function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/upload')
    .send({token: testToken, photoUrl: 'test', phoneId: '123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      testUrl = res.body.img;
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should post upvote', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/vote/' + testId)
    .send({token:testToken, photoUrl: testUrl, userId: '123', registeredVote: 'up'})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('you registered up');
      done();
    });
  });

  it('should post downvote', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/vote/' + testId)
    .send({token:testToken, photoUrl: testUrl, userId: '123', registeredVote: 'down'})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('you registered down');
      done();
    });
  });

}); 