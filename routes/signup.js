const express = require('express');
const router = express.Router();
const sha256 = require('sha256');
const { User } = require('../db/models')

// this is /signup
router.route('/')
  .get((req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    const { name, email, password, userRole } = req.body;
    const ourUser = await User.create({ name, email, password: sha256(password), userRole });
    req.session.userId = ourUser.id;
    req.session.userEmail = ourUser.email;
    req.session.userPass = sha256(ourUser.password);
    req.session.userName = ourUser.name;
    res.redirect('/profile');
  });

module.exports = router;
