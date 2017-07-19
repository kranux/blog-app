const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const INSERT_STATEMENT = 'INSERT INTO posts VALUES (?, ?, ?, ?, ?)';

module.exports.initialize = () => {
	db.serialize(() => {
		db.run('CREATE TABLE posts (title TEXT, content TEXT, author NUMBER, created DATE, modified DATE)');

		const stmt = db.prepare(INSERT_STATEMENT);
		for (var i = 0; i < 10; i++) {
			stmt.run(`Ipsum${i}`, `ipsum${i}`, 1, new Date(), new Date());
		}
		stmt.finalize();
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
	const stmt = db.prepare(INSERT_STATEMENT);
	stmt.run(post.title, post.content, 1, new Date(), new Date(), function(error) {
		if (error) {
			reject(error);
		}
		resolve(this.lastID);
	});
	stmt.finalize();
});

