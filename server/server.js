var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

//add for Automatically alter the table schemas based on the model definitions.
//http://docs.strongloop.com/display/public/LB/Creating+a+database+schema+from+models#Creatingadatabaseschemafrommodels-Auto-update
app.datasources['db'].autoupdate(['numessage','nusite'], function(err) {
     console.log('autoupdate err='+err);
});
