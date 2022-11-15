const {
  roleValidation,
  rolesValidationArray,
} = require('../middleware/roles.middleware');
const { ADMIN, USER, OTRO } = require('../const/user.const');
const UserModel = require('../models/User.model');

const router = require('express').Router();

router.get('/', roleValidation(USER), (req, res) => {
  // const user = req.session.user;
  res.render('user/index', req.session.user);
});

router.get('/me', (req, res) => {
  const { user } = req.session;
  UserModel.findById(user._id)
    .then((user) => {
      res.render('user/index');
    })
    .catch(next);
});

router.get('/admin', roleValidation(ADMIN), (req, res) => {
  res.render('user/admin', req.session.user);
});

router.get('/otro', roleValidation(OTRO), (req, res) => {
  res.render('user/otro', req.session.user);
});

router.get('/joker', rolesValidationArray([OTRO, USER]), (req, res) => {
  res.render('user/index', req.session.user);
});

module.exports = router;
