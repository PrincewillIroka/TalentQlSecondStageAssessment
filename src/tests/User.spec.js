import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';

chai.use(chaiHTTP);
chai.should();

export default () => {
	let token;

	describe('User', () => {
		describe('GET /', () => {
			it('should return welcome message', (done) => {
				chai.request(app)
					.get('/')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message').eql('Welcome to TalentQl Assessment!');
						done();
					});
			});
		});

		describe('POST /api/users/registration', () => {
			const userData = {
				email: 'test@gmail.com',
				password: '1234567890',
				name: 'Test Account',
			};
			it('should register a user', (done) => {
				chai.request(app)
					.post('/api/users/registration')
					.send(userData)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success').eql(true);
						done();
					});
			});
		});
	});

	describe('POST /api/users/login', () => {
		const userData = {
			email: 'test@gmail.com',
			password: '1234567890',
		};
		it('should login a user', (done) => {
			chai.request(app)
				.post('/api/users/login')
				.send(userData)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success').eql(true);
					token = res.body?.payload?.user?.token;
					done();
				});
		});
	});

	describe('POST /api/users/resetPassword', () => {
		it(`should reset a user's password`, (done) => {
			chai.request(app)
				.patch('/api/users/resetPassword')
				.set({ Authorization: `Bearer ${token}` })
				.send({ password: '1234567891' })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success').eql(true);
					done();
				});
		});
	});
};
