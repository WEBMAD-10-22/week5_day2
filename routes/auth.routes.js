const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { ENUM_ROLES } = require('../const/user.const');

const UserModel = require('../models/User.model');

const SALT = 10;

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  })
})

// ---- POST ----

router.post('/signup', (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!ENUM_ROLES.includes(role)) {
    res.render('/auth/signup', { messageError: 'Rol no permitido!!!' });
    return;
  }

  const salt = bcrypt.genSaltSync(SALT);
  const hashPassword = bcrypt.hashSync(password, salt);

  UserModel.create({ username, email, password: hashPassword, role })
    .then((user) => {
      req.session.user = user;
      res.redirect('/user');
    })
    .catch((err) => next(err));
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      if (!email) {
        res.render('auth/login', {
          errorMessage: 'Email o contraseña invalidos.',
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/user');
      } else {
        res.render('auth/login', {
          errorMessage: 'Email o contraseña invalidos.',
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
