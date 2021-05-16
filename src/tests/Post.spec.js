import { array } from '@hapi/joi';
import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import { generateToken } from '../utils/helpers/AuthHelper';

chai.use(chaiHTTP);
chai.should();

export default () => {
	let token = generateToken({ email: 'test@gmail.com', id: 1 }),
		postId;

	describe('Posts', () => {
		describe('GET /api/posts/publish', () => {
			it('should publish a post', (done) => {
				const content = 'Simple post content';
				chai.request(app)
					.post('/api/posts/publish')
					.set('Authorization', `Bearer ${token}`)
					.send({ content })
					.end((err, res) => {
						postId = res.body?.payload?.id;
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success').eql(true);
						res.body.should.have.property('payload').to.be.an('object').to.have.property('content');
						done();
					});
			});
		});

		describe('POST /api/posts/:postId', () => {
			it('should fetch a post', (done) => {
				chai.request(app)
					.get(`/api/posts/${postId}`)
					.set('Authorization', `Bearer ${token}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success').eql(true);
						res.body.should.have.property('payload').to.be.an('object').to.have.property('content');
						done();
					});
			});
		});

		describe('POST /api/posts/', () => {
			it('should edit a post', (done) => {
				let content = 'Updated content';
				chai.request(app)
					.patch('/api/posts/')
					.set({ Authorization: `Bearer ${token}` })
					.send({ postId, content })
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success').eql(true);
						res.body.should.have.property('message').eql('Post updated successfully!');
						done();
					});
			});
		});

		describe('POST /api/posts/like', () => {
			it('should like a post', (done) => {
				let status = 'like';
				chai.request(app)
					.post('/api/posts/like')
					.set({ Authorization: `Bearer ${token}` })
					.send({ postId, status })
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success').eql(true);
						res.body.should.have.property('message').eql('User liked the post!');
						done();
					});
			});
		});

		describe('POST /api/posts/reply', () => {
			it('should reply a post', (done) => {
				let comment = 'A simple reply';
				chai.request(app)
					.post('/api/posts/reply')
					.set({ Authorization: `Bearer ${token}` })
					.send({ postId, comment })
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success').eql(true);
						res.body.should.have.property('message').eql('User added a reply!');
						done();
					});
			});
		});

		describe('POST /api/posts/', () => {
			it('should delete a post', (done) => {
				chai.request(app)
					.delete('/api/posts/')
					.set({ Authorization: `Bearer ${token}` })
					.send({ postId })
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success').eql(true);
						res.body.should.have.property('message').eql('Post deleted successfully!');
						done();
					});
			});
		});
	});
};
