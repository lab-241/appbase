
var config = require('../../server/config.json');

module.exports = function(User) {

  function updateShopLikesCount(shopId){
    var Favoriteshop = User.app.models.Favoriteshop;
    Favoriteshop.count({shopId: shopId}, function(err, count){
      if(err){
        console.error('Update nbLikes : count failed', err);
        return;
      }
      var Shop = User.app.models.Shop;
      Shop.setNbLikes(shopId, count);
    });
  }

  /**
   * Send user reset-password e-mail
   * Hook called on POST /users/rest
   */
  User.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    User.app.models.Email.send({
      to: info.email,
      from: 'noreply@appbase.ga',
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> Error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  /**
   * Update shop likes count
   * Hook called on PUT /users/{id}/favoriteshops/rel/{fk}
   */
  User.afterRemote('prototype.__link__favoriteshops', function(context, user, next) {
    var req = context.req;
    updateShopLikesCount(req.params.fk);
    next();
  });

  /**
   * Update shop likes count
   * Hook called on DELETE /users/{id}/favoriteshops/rel/{fk}
   */
  User.afterRemote('prototype.__unlink__favoriteshops', function(context, user, next) {
    console.error(context.req.params.fk);
    var req = context.req;
    updateShopLikesCount(req.params.fk);
    next();
  });
};
