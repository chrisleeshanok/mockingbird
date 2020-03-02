var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var nconf = require('nconf');
var debug = require('debug')('gallery2:server');
var http = require('http');
var https = require('https');
var nconf = require('nconf');
var fs = require('fs');

//Routers
var index_router = require('./routes/index');
var mock_api_router = require('./routes/api/mockapi');
var api_router = require('./routes/api/mock');
var method_api_router = require('./routes/api/methods');
var mocks_router = require('./routes/mocks');
var status_router = require('./routes/status');

//mongodb
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gallery');

//Instantiate App
var app = express();

//nconf setup
nconf.argv()
     .env();
if (process.env.NODE_ENV) {
    nconf.file('environment', './config/config-' + app.get('env') + '.json');
}
nconf.file('default', 'config/config.json');


// view engine setup
app.engine('dust', cons.dust);
app.set('views', __dirname + '/views');
app.set('view engine', 'dust');

//parsing and logs
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '200kb'
 }));
app.use(cookieParser());

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routing = nconf.get('ROUTING');

//Statics
app.use(routing.APP_URI + '/bower_components', express.static(__dirname + '/bower_components'));
app.use(routing.APP_URI + '/public', express.static(__dirname + '/public'));

//Routes
app.use(index_router);
app.use(status_router);
app.use(mock_api_router);  // (/mockapi/mock/:mockid)
app.use(api_router);  // (/api/mock/:mockid)
app.use(method_api_router);  // (/api/method/:methodid)
app.use(mocks_router); // (/api/mocks)

// error handlers
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  if (err) {
      next(err);
  } else {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/**
 * Get port from environment and store in Express.
 */
 var serverConfig = nconf.get('CONFIG');

//TODO: MOVE PORT TO CONFIG
var port = normalizePort(serverConfig.PORT);
app.set('port', port);

//HTTP
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//https
var credentials = {
    key: fs.readFileSync(nconf.get('SSL').PRIVATE_KEY, 'utf8'),
    cert: fs.readFileSync(nconf.get('SSL').CERTIFICATE, 'utf8')
};
var httpsServer = https.createServer(credentials, app);
var httpsPort = normalizePort(serverConfig.HTTPS_PORT);
httpsServer.listen(httpsPort);
server.on('error', onError);
server.on('listening', onListening);



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = app;
