const request = require('supertest');
const app = require('../app');
const assert = require('assert');

describe('App routes', () => {
	describe('/api', () => {
		describe('/posts', () => {
			it('should get posts', (done) => {
				request(app)
				.get('/api/posts')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) throw err;
					done();
				});
			});
		});
	})
});
