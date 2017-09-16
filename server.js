var express = require('express');
var path    = require('path');
var app = express();

app.set('port', (process.env.PORT || 5000)); // process.env.PORT is for Heroku instance

app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/properties', function(request, response) {
    // GITHUB_TOKEN created manually by me, on Heroku control panel (configs)
  	response.send(process.env.GITHUB_TOKEN);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
