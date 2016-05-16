var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var bodyParser = require('body-parser');

var app = module.exports = loopback();

// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(loopback.token());

//-- Remove server type header
app.disable('x-powered-by');

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');

    console.log('==============================================');
    console.log('****************  APP BASE  ******************');

    console.log('| NODE_ENV : '+ process.env.NODE_ENV);
    console.log('| Web server : %s', baseUrl);

    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('| API browser :  %s%s', baseUrl, explorerPath);
    }

    console.log('| Admin dashboard :  %s%s', baseUrl, '/admin');
    console.log('==============================================');
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
