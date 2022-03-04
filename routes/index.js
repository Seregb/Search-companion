const express = require('express');
const router = express.Router();
const { Way } = require('../db/models')

/* GET home page. */
router.get('/', async (req, res) => {
  const allWay = await Way.findAll();
  res.render('index', { allWay });
});

module.exports = router;
