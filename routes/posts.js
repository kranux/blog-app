var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET posts listing. */
router.get('/', async (req, res, next) => {
  try {
    res.send(await db.getUsers());
  } catch (ex) {
    res.send('An error has occoured');
  }
});

module.exports = router;
