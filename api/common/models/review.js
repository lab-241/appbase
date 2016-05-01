module.exports = function(Review) {
  /**
   * Set the creation date and pusher id before create a new review
   */
  Review.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    req.body.date = Date.now();
    req.body.publisherId = req.accessToken.userId;
    next();
  });

  /**
   * Update the global note and number of review after create a new review
   */
  Review.afterRemote('create', function(context, user, next) {
    var Shop = Review.app.models.Shop;
    var req = context.req;
    Shop.rate(req.body.shopId, req.body.rating);
    next();
  });

  /**
   * Update the global note and number of review after create a new review
   */
  Review.afterRemote('delete', function(context, user, next) {
    var Shop = Review.app.models.Shop;
    var req = context.req;
    Shop.unrate(req.body.shopId, req.body.rating);
    next();
  });

};
