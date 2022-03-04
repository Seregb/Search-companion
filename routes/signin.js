const express = require('express');
const sha256 = require('sha256');
const { checkExistingUsers } = require('../middleware/allMidlleWares')

const router = express.Router();
const { User } = require('../db/models');

// this is /signin
router.route('/')
  .get((req, res) => {
    res.render('signin');
  })
  .post(async (req, res) => {
    const { email } = req.body;
    const ourUser = await User.findOne({ where: { email } });
    if (ourUser) {
      req.session.userId = ourUser.id;
      req.session.userEmail = ourUser.email;
      req.session.userPass = sha256(ourUser.password);
      req.session.userName = ourUser.name;
      return res.redirect('/profile');
    }
    return res.redirect('/signup')
  });

module.exports = router;
