const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const bcrypt = require('bcrypt');

const INSERT_POST_STATEMENT = 'INSERT INTO posts VALUES (?, ?, ?, ?, ?)';

const initializePosts = () => {
	db.run('CREATE TABLE posts (title TEXT, content TEXT, author NUMBER, created DATE, modified DATE)');

	const stmt = db.prepare(INSERT_POST_STATEMENT);
	for (var i = 0; i < 10; i++) {
		stmt.run(`Ipsum${i}`, `ipsum${i}`, 1, new Date(), new Date());
	}
	stmt.finalize();
};

const initializeUsers = () => {
	db.run('CREATE TABLE users (username TEXT, hash TEXT)');

	const stmt = db.prepare('INSERT INTO users VALUES(?, ?)');

	bcrypt.hash('password', 10).then((hash) => {
		stmt.run('user', hash);
		stmt.finalize();
	});
};

module.exports.initialize = () => {
	db.serialize(() => {
		initializePosts();
		initializeUsers();
	});
};

module.exports.getPosts = () => new Promise((resolve, reject) => {
	db.all('SELECT rowid AS id, title, content, author, created, modified FROM posts ORDER BY created DESC', (err, data) => {
		if (err) {
			reject(err);
		}
		resolve(data);
	});
});

module.exports.createPost = (post) => new Promise((resolve, reject) => {
	const stmt = db.prepare(INSERT_POST_STATEMENT);
	stmt.run(post.title, post.content, 1, new Date(), new Date(), function(error) {
		if (error) {
			reject(error);
		}
		resolve(this.lastID);
	});
	stmt.finalize();
});

module.exports.getUser = (username, password) => new Promise((resolve, reject) => {
	const stmt = db.prepare('SELECT username, rowid AS id, hash FROM users WHERE (username=?)');

	stmt.get(username, (err, user) => {
		if (err) {
			return reject(err);
		}
		if (!user) {
			return reject('Not found');
		}
		bcrypt.compare(password, user.hash)
			.then((result) => {
				if (result) {
					resolve({
						id: user.id,
						username: user.username
					});
				}
				reject('Password does not match.');
			}).catch(reject);
	});
});

module.exports.userById = (userId) => new Promise((resolve, reject) => {
	const stmt = db.prepare('SELECT username FROM users WHERE (rowid=?)');
	stmt.get(userId, (err, user) => {
		if (err) {
			reject(err);
		}
		if (!user) {
			reject('Not found');
		}
		resolve(user);
	});
});
