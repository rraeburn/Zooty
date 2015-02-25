'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/photos_test';
require('../server.js');

var chai = require('chai'),
    chaihttp = require('chai-http'),
    mongoose = require('mongoose');

chai.use(chaihttp);

var expect = chai.expect;

describe('photos route end points', function() {
  var testToken;
  
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
      expect(res.body.img).to.eql('test IT');
      expect(res.body.msg).to.eql('photo uploaded');
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

  it('should get stats', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/stats')
    .send({token: testToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body[0]).to.have.property('phoneId');
      expect(res.body[0]).to.have.property('_id');
      done();
    });
  });

});

