const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../db');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
	console.log('serializeUser', user);
	done(null, user.id);
});

passport.deserializeUser((userId, done) => {
	console.log('deserialize', userId);
	db.userById(userId).then(user => {
		done(null, user);
	});
});

passport.use(new LocalStrategy((username, password, done) => {
	db.getUser(username, password)
		.then(user => done(null, user), err => done(null, false, { message: err }))
		.catch(err => done(null, false, { message: err }));
	}
));

router.post('/users',
(req, res, next) => {
	req.body = {
		username: req.body.data.attributes.username,
		password: req.body.data.attributes.password
	};
	next();
},
passport.authenticate('local'),
(req, res) => {
	req.session.aaa = 'bbbb';
	res.send({data: {id: -1, type: 'user', attributes: req.user}});
});

router.get('/users/:id', (req, res) => {
	console.log('get user', req.isAuthenticated());
	console.log(req.session)
	if (req.isAuthenticated()) {
		res.send({data: {id: -1, type: 'user', attributes: req.user}});
	} else {
		res.status(403).send('Unauthenticated');
	}
});

module.exports = router;
module.exports.passport = passport;
