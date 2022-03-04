const sha256 = require('sha256');
const { User } = require('../db/models');

async function checkExistingUsers(req, res, next) {
  if (req.session.userEmail) {
    const ourUser = await User.findOne({ where: { email: req.session.userEmail } });
    if (ourUser) {
      if (req.session.userPass === sha256(ourUser.password)) {
        return next();
      }
    }
  } else {
    return res.redirect('/signup');
  }
}

const addToLocals = (req, res, next) => {
  res.locals.userId = req.session?.userId;
  if (req.session) {
    res.locals.userName = req.session.userName;
    res.locals.userEmail = req.session.userEmail;
  }
  next();
};

function checkSlot(req, res, next) {

}

module.exports = {
  checkExistingUsers,
  addToLocals,
  checkSlot,
};
