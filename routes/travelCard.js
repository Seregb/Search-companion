const router = require('express').Router();
const { Way } = require('../db/models')

// this is /travelCard
router.route('/:id')
  .get(async (req, res) => {
    const ourWay = await Way.findOne({ where: { id: req.params.id } });
    res.render('travelCard', { ourWay });
  })
  .post(async (req, res) => {
    const ourWay = await Way.findOne({ where: { id: req.params.id } });
    res.json(ourWay);
  })



module.exports = router;
