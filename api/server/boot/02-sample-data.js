module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  var City = app.models.city;
  var Shop = app.models.shop;
  var Review = app.models.review;

  var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
	'Nisi sit ducimus veritatis ab perferendis nulla numquam, similique ' +
	'cupiditate incidunt.';

  var db = app.dataSources.db;

  if(process.env.NODE_ENV == 'staging' || process.env.NODE_ENV == 'production'){
    console.log('NODE_ENV', process.env.NODE_ENV);
    console.log('!! CAUTION !! <automigrate> will destroy all data');
    console.log('IMPORT SAMPLE DATA ABRORTED');
    return;
  }

  console.log('START IMPORT SAMPLE DATA ...');

  //-- Create cities, then user and shops
  db.automigrate('city', function(err) {
    City.create([
      {name: 'Libreville', location: {lat: 0.3924100, lng: 9.4535600}},
      {name: 'Port-Gentil', location: {lat: -0.7193300, lng: 8.7815100}},
      {name: 'Franceville', location: {lat: -1.6333300 , lng: 13.5835700}}
    ], function(err, cities) {
      if (err) return console.log('%j', err);
      console.log('Created cities', cities.length);

      createUser(function(users){
        //-- If cities and users created, add shops
        createShops(cities, users);
      })
    });
  });

  //-- Create shop
  function createShops(cities, users) {
    db.automigrate('shop', function(err) {
      if (err) return cb(err);
      Shop.create([
          {
            name: 'Techo shop 3000',
            desc: 'Le 100% hi-Tech. ' + lorem,
            cityId: cities[0].id,
            managerId:users[0].id,
            location: {lat: 0.3924100, lng: 9.4535600}
          },
          {
            name: 'Africa fashion',
            desc: 'La mode afro à petit prix. ' + lorem,
            cityId: cities[1].id,
            managerId:users[1].id,
            location: {lat: 0.3924100, lng: 9.4535600}
          },
          {
            name: 'Le temple du cuir',
            desc: 'Le meilleur tout simplement. ' + lorem,
            cityId: cities[2].id,
            managerId:users[2].id,
            location: {lat: 0.3924100, lng: 9.4535600}
          }
      ], function(err, shops) {
          if (err) return console.log('%j', err);
          console.log('Created shops', shops.length);

          //-- If shops an users exist we can add shops
          createReviews(users, shops);
      });
    });
  }

  //-- Create reviews
  function createReviews(reviewers, shops, cb) {
    db.automigrate('review', function(err) {
      if (err) return cb(err);

      var DAY_IN_MILLS = 1000 * 60 * 60 * 24;

      Review.create([
        {
          date: Date.now() - (DAY_IN_MILLS * 4),
          rating: 5,
          comments: 'A very good coffee shop.',
          publisherId: reviewers[0].id,
          shopId: shops[0].id
        },
        {
          date: Date.now() - (DAY_IN_MILLS * 3),
          rating: 5,
          comments: 'Quite pleasant.',
          publisherId: reviewers[1].id,
          shopId: shops[1].id
        },
        {
          date: Date.now() - (DAY_IN_MILLS * 2),
          rating: 4,
          comments: 'It was ok.',
          publisherId: reviewers[2].id,
          shopId: shops[2].id
        },
        {
          date: Date.now() - (DAY_IN_MILLS),
          rating: 4,
          comments: 'I go here everyday.',
          publisherId: reviewers.id,
          shopId: shops[0].id
        }
      ], function(err, reviews) {
          if (err) return console.log('%j', err);
          console.log('Created reviews', reviews.length);
          return cb;
      });
    });
  }

  //-- Create users & roles
  function createUser(cb){
    db.automigrate('user', function(err) {
      User.create([
        {username: 'John', email: 'john@appbase.ga', password: 'appbase'},
        {username: 'Jane', email: 'jane@appbase.ga', password: 'appbase'},
        {username: 'Toto', email: 'toto@appbase.ga', password: 'appbase'}
      ], function(err, users) {
        if (err) return console.log('%j', err);

        //-- trigger callback
        cb(users);

        // Create the admin role
        Role.create({
          name: 'admin'
        }, function(err, role) {
          if (err) return console.log(err);
          console.log('Created role',role.name);

          // Make Mike an admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[2].id
          }, function(err, principal) {
            if (err) return console.log(err);
            console.log('User', users[2].username, 'added to', role.name);
          });
        });
      });
    });
  }
};
