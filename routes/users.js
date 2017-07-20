const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../db');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
	db.getUser(username, password)
		.then(user => done(null, user), err => done(null, false, { message: err }))
		.catch(err => done(null, false, { message: err }));
	}
));

router.post('/users', (req, res, next) => {
	req.body = {
		username: req.body.data.attributes.email,
		password: req.body.data.attributes.password
	};
	next();
}, passport.authenticate('local',
	{
  failureRedirect: '/'
		}
), (req, res) => {
	res.send({data: {id: -1, type: 'user'}});
});

module.exports = router;
