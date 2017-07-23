const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const app = express();
const cors = require('cors');

app.use(cors({
	credentials: true,
	origin: 'http://localhost:4200'
}));
app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(session({
	secret: 'very.secure',
	name: 'blog-app',
	store: new session.MemoryStore(),
	domain: '.localhost:4200',
	cookie: {
		httpOnly: false,
		secure: false,
		path: '/',
		maxAge : (4 * 60 * 60 * 1000),
		domain: 'http://localhost:4200'
	}
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(require('./routes/users').passport.initialize());
app.use(require('./routes/users').passport.session());

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

db.initialize();
