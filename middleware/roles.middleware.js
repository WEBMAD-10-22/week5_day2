// const roleValidationUser = (req, res, next) => {
//   if (req.session.user.role === 'User') {
//     next();
//   } else {
//     res.render('not-found');
//   }
// };

// const roleValidationAdmin = (req, res, next) => {
//   if (req.session.user.role === 'Admin') {
//     next();
//   } else {
//     res.render('not-found');
//   }
// };

// const roleValidationOtro = (req, res, next) => {
//   if (req.session.user.role === 'Otro') {
//     next();
//   } else {
//     res.render('not-found');
//   }
// }

const roleValidation = (role) => (req, res, next) => {
  if (req.session.user && req.session.user.role === role) {
    next();
  } else {
    res.render('not-found');
  }
};
// req.session.user.role = 'User'
const rolesValidationArray = (roles) => (req, res, next) => { // roles -> ['Admin', 'User']
  // let aux = false;
  // roles.forEach((role) => { // role -> 'Admin' | role -> 'User'
  //   if (req.session.user.role === role) { // User === Admin | User === User
  //     aux = true
  //   }
  // });

  // if (aux) {
  //   next();
  // } else {
  //   res.render('not-found');
  // }
  if (req.session.user && roles.includes(req.session.user.role)) {
    next();
  } else{
    res.render('not-found');
  }
};

module.exports = {
  roleValidation,
  rolesValidationArray
};
