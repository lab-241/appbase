module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  
  var City = app.models.city;
  var Shop = app.models.shop;
  var Review = app.models.review;
  
  //-- Create cities
  City.create([
    {name: 'Libreville', location: {lat: 0.3924100, lng: 9.4535600}},
    {name: 'Port-Gentil', location: {lat: -0.7193300, lng: 8.7815100}},
    {name: 'Franceville', location: {lat: -1.6333300 , lng: 13.5835700}}
  ], function(err, cities) {
    if (err) return console.log('%j', err);
    console.log('Create cities', cities);
  });
  
  //-- Create shop
  function createShops() {
    Shop.create([
        {
            name: 'Techo shop 3000', 
            desc: 'Boutique Hi-Tech. Lorem ipsum dolor sit amet', 
            cityId:1, 
            managerId:1, 
            location: {lat: 0.3924100, lng: 9.4535600}
        },
        {
            name: 'Africa fashion', 
            desc: 'La moode afro à petit prix. Lorem ipsum dolor sit amet', 
            cityId:1, 
            managerId:1, 
            location: {lat: 0.3924100, lng: 9.4535600}
        }
    ], function(err, shops) {
        if (err) return console.log('%j', err);
        console.log('Create shops', shops);
    }); 
  }

  //-- Create reviews
  function createReviews(reviewer, coffeeShop, cb) {
    // mongoDs.automigrate('Review', function(err) {
    //   if (err) return cb(err);

      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

      Review.create([
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 4),
          rating: 5,
          comments: 'A very good coffee shop.',
          publisherId: reviewer.id,
          coffeeShopId: coffeeShop.id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 3),
          rating: 5,
          comments: 'Quite pleasant.',
          publisherId: reviewer.id,
          coffeeShopId: coffeeShop.id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 2),
          rating: 4,
          comments: 'It was ok.',
          publisherId: reviewer.id,
          coffeeShopId: coffeeShop.id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 4,
          comments: 'I go here everyday.',
          publisherId: reviewer.id,
          coffeeShopId: coffeeShop.id
        }
      ], cb);
    //});
  }
      
  //-- Create users & roles
  User.create([
    {username: 'John', email: 'john@appbase.ga', password: 'appbase'},
    {username: 'Jane', email: 'jane@appbase.ga', password: 'appbase'},
    {username: 'Toto', email: 'toto@appbase.ga', password: 'appbase'}
  ], function(err, users) {
    if (err) return console.log('%j', err);
    
    //-- If cities an users exist we can add shops
    createShops();

    // Create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) return console.log(err);
      console.log('Create role',role);
 
      // Make Mike an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) return console.log(err);
        console.log('Add user to admins', principal);
      });
    });
  });
};