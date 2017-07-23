const express = require('express');
const router = express.Router();
const db = require('../db');

const type = 'post';

/* GET posts listing. */
router.get('/', async (req, res) => {
	try {
		res.send({
			data: (await db.getPosts()).map((attributes) => ({
				attributes,
				id: attributes.id,
				type
			}))
		});
	} catch (ex) {
		res.status(500).send({errors: [String(ex)]});
	}
});

router.post('/', async (req, res) => {
	try {
		const id = await db.createPost(req.body.data.attributes);
		res.send({data: {id, type}});
	} catch (ex) {
		res.status(500).send({errors: [String(ex)]});
	}
});

module.exports = router;
