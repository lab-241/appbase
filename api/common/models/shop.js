module.exports = function(Shop) {
  /**
   * Rate the shop (calculating the global note and incrementing the number of reviews)
   * @param  {int} shopId Shop Id
   * @param  {int} rating The rate set by user
   * @return {globalNote,nbReviews}
   */
  Shop.rate = function(shopId, rating,cb) {
    Shop.findById(shopId , function (err, instance){
      var response = {};
      if(!instance.globalNote){
        instance.globalNote = 0;
      }
      if(!instance.nbReviews){
        instance.nbReviews = 0;
      }
      instance.globalNote = (rating + ( instance.nbReviews *  instance.globalNote)) / (instance.nbReviews + 1);
      instance.nbReviews++;
      instance.save().then(function(){
        response.globalNote = instance.globalNote;
        response.nbReviews = instance.nbReviews;
        cb(null, response);
      });
    });
  };

  /**
   * Rate remoteMethod declaration
   */
  Shop.remoteMethod(
    'rate',
    {
      description : 'Rate the shop (calculating the global note and incrementing the number of reviews)',
      accepts: [
        {arg: 'id', type: 'string', description: 'Shop Id', required: true},
        {arg: 'rating', type: 'number', description: 'Note', required: true}
      ],
      http: {path: '/:id/rate/:rating', verb: 'post'},
      returns: {arg: 'response', type: 'object'}
    }
  );

  /**
   * Unrate the shop (calculating the global note and decrementing the number of reviews)
   * @param  {int} shopId Shop Id
   * @param  {int} rating The rate set by user
   * @return {globalNote,nbReviews}
   */
  Shop.unrate = function(shopId, rating,cb) {
    Shop.findById(shopId , function (err, instance){
      var response = {};
      if(!instance.globalNote || !instance.nbReviews ||
        instance.globalNote === 0 || instance.nbReviews === 0 ||
        (instance.nbReviews === 1 && instance.globalNote !== rating) ){
        cb('Unconsistent data', null);
      } else {
        instance.globalNote = (( instance.nbReviews * instance.globalNote) - rating) / (instance.nbReviews - 1);
        instance.nbReviews--;
        instance.save().then(function(){
          response.globalNote = instance.globalNote;
          response.nbReviews = instance.nbReviews;
          cb(null, response);
        });
      }
    });
  };

  /**
   * Rate remoteMethod declaration
   */
  Shop.remoteMethod(
    'unrate',
    {
      description : 'Unrate the shop (calculating the global note and decrementing the number of reviews)',
      accepts: [
        {arg: 'id', type: 'string', description: 'Shop Id', required: true},
        {arg: 'rating', type: 'number', description: 'Deleted Note', required: true}
      ],
      http: {path: '/:id/unrate/:rating', verb: 'post'},
      returns: {arg: 'response', type: 'object'}
    }
  );

};
