module.exports = function(req, res, next) {
  if (req.user.business == true) {
    req.flash('error', 'you do not have access');
    res.redirect('/profile');
  } else {
    next();
  }
};
