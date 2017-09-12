var express = require('express');
var path    = require("path");
var app = express();

console.log(process.env.GITHUB_TOKEN);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
