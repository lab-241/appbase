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
