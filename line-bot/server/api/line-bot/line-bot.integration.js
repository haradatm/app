'use strict';

var app = require('../..');
import request from 'supertest';

describe('LineBot API:', function() {

  describe('GET /api/line-bots', function() {
    var lineBots;

    beforeEach(function(done) {
      request(app)
        .get('/api/line-bots')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          lineBots = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      lineBots.should.be.instanceOf(Array);
    });

  });

});
