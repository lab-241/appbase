module.exports = function(User) {
  /**
   * Hook call when PUT /users/{id}/favoriteshops/rel/{fk}
   */
  User.afterRemote('prototype.__link__favoriteshops', function(context, user, next) {
    var req = context.req;
    var Shop = User.app.models.Shop;
    //Shop.addLike();
    console.log(req.body);
    next();
  });

  /**
   * Hook call when DELETE /users/{id}/favoriteshops/rel/{fk}
   */
  User.afterRemote('prototype.__unlink__favoriteshops', function(context, user, next) {
    var req = context.req;
    var Shop = User.app.models.Shop;
    //Shop.removeLike();
    console.log(req);
    next();
  });
};
