var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET posts listing. */
router.get('/', async (req, res) => {
	try {
		res.send({
			data: (await db.getPosts()).map((user) => ({
				id: user.id,
				type: 'post',
				attributes: user
			}))
		});
	} catch (ex) {
		res.status(500).send(`An error has occoured: ${ex}`);
	}
});

module.exports = router;
