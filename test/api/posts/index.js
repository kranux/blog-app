const request = require('supertest');
const app = require('../../../app');

describe('/posts', () => {

	it('should GET /posts', (done) => {
		request(app)
		.get('/api/posts')
		.expect('Content-Type', /json/)
		.expect(200)
		.end((err, res) => {
			if (err) throw err;
			done();
		});
	});

	it('should POST /posts', (done) => {
		request(app)
			.post('/api/posts')
			.send({
				data: {
					attributes: {
						title: 'test-title',
						content: 'test-content'
					}
				}})
			.set('Content-Type', 'application/vnd.api+json')
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				done();
			});
	});

	it('should return 500 with invalid data', (done) => {
		request(app)
			.post('/api/posts')
			.expect(500)
			.end((err, res) => {
				if (err) throw err;
				done();
			})
	});
});
