const express = require('express');

const router = express.Router();
const { checkExistingUsers } = require('../middleware/allMidlleWares');
const { User, Way } = require('../db/models');

// this is Profile
router.route('/')
  .get(checkExistingUsers, async (req, res) => {
    const ourUser = await User.findOne({ where: { email: req.session.userEmail } });
    const allWay = await Way.findAll({ where: { userId: ourUser.id } });
    const isDriver = (userIdRole) => {
      return userIdRole === 1;
    }
    // console.log(allWay[0].startAt.toLocaleString());
    res.render('profile', { ourUser, allWay, isDriver: isDriver(ourUser.userRole) });
  })
  .post(async (req, res) => {
    const {
      From, To, passengerCount, startAt, description,
    } = req.body;
    const ourWay = await Way.findOne({ where: { from: From, to: To } });
    await Way.create({
      from: From,
      to: To,
      passengerCount,
      startAt: startAt.toLocaleString(),
      description,
      userId: req.session.userId,
    });
    return res.redirect('/profile');
  })
  .delete(async (req, res) => {
    try {
      await Way.destroy({ where: { id: +req.body.cardId } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(418);
    }
  })

const isDriver = (userIdRole) => {
  return userIdRole === 1;
}

router.route('/form/ride')
  .get(async (req, res) => {
    const ourUser = await User.findOne({ where: { email: req.session.userEmail } });
    res.render('itemsform', { isDriver: isDriver(ourUser.userRole) });
  })
  .post(async (req, res) => {
    const { from, to, passengerCount, startAt, description } = req.body;
    const allWays = await Way.findAll({ where: { from } });
    res.json(allWays);
  })

router.route('/form/search')
  .get(async (req, res) => {
    res.render('itemsform',);
  })
  .post(async (req, res) => {
    const { From, To } = req.body;
    const allWays = await Way.findAll();
    // console.log(From);
    allWays.filter((el) => {
      el.from.includes(From)
    })
    res.json(allWays);
  })

router.route('/info')
  .get(async (req, res) => {
    const ourUser = await User.findOne({ where: { email: req.session.userEmail } });
    res.json({ ourUser });
  })


router.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('userCookie');
    res.redirect('/');
  });
module.exports = router;
