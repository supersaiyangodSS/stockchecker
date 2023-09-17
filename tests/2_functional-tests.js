const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', function() {
    it('Viewing one stock: GET request to /api/stock-prices/', (done) => {
        chai
            .request(server)
            .get('/api/stock-prices/')
            .query({ stock: 'AAPL' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                done();
            });
    });

    it('Viewing the same stock and liking it again: GET request to /api/stock-prices/', (done) => {
        chai
            .request(server)
            .get('/api/stock-prices/')
            .query({ stock: 'AAPL', like: true })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                done();
            });
    });

    it('Viewing two stocks: GET request to /api/stock-prices/', (done) => {
        chai
            .request(server)
            .get('/api/stock-prices/')
            .query({ stock: ['AAPL', 'GOOGL'] })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isArray(res.body.stockData, 'Response should be an array');
                done();
            });
    });

    it('Viewing two stocks and liking them: GET request to /api/stock-prices/', (done) => {
        chai
            .request(server)
            .get('/api/stock-prices/')
            .query({ stock: ['AAPL', 'GOOGL'], like: true })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isArray(res.body.stockData, 'Response should be an array');
                done();
            });
    });
    it('Viewing two stocks and liking them: GET request to /api/stock-prices/', (done) => {
      chai
          .request(server)
          .get('/api/stock-prices/')
          .query({ stock: ['AAPL', 'GOOGL'], like: true })
          .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isArray(res.body.stockData, 'Response should be an array');
              assert.property(res.body.stockData[0], 'rel_likes', 'Response should have a rel_likes property');
              assert.property(res.body.stockData[1], 'rel_likes', 'Response should have a rel_likes property');
              done();
          });
  });

});
