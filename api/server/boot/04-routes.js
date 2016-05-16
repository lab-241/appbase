module.exports = function(app) {
  var User = app.models.user;

    //show password reset form
    app.get('/reset-password', function(req, res, next) {
      console.log(req);
      console.log(req.accessToken);
      if (!req.accessToken) return res.sendStatus(401);
      res.render('password-reset', {
        accessToken: req.accessToken.id
      });
    });

    //reset the user's pasword
    app.post('/reset-password', function(req, res, next) {
      if (!req.accessToken) return res.sendStatus(401);

      //verify passwords match
      if (!req.body.password ||
          !req.body.confirmation ||
          req.body.password !== req.body.confirmation) {
        return res.sendStatus(400, new Error('Passwords do not match'));
      }

      User.findById(req.accessToken.userId, function(err, user) {
        if (err) return res.sendStatus(404);
        user.updateAttribute('password', req.body.password, function(err, user) {
        if (err) return res.sendStatus(404);
          console.log('> password reset processed successfully');
          res.render('response', {
            title: 'Password reset success',
            content: 'Your password has been reset successfully',
            redirectTo: '/',
            redirectToLinkText: 'Log in'
          });
        });
      });
    });

};
