module.exports = function(City) {
  City.on('changed', function(inst) {
    console.log('model with id %s has been changed', inst.id);
    console.log( inst );
  });
};
