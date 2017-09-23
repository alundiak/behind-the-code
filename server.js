var express = require('express')
var path = require('path')
var app = express()
var cors = require('cors')
var dotenv = require('dotenv').config() // for usage env file as extension to process.env variables
var ClientOAuth2 = require('client-oauth2')

var githubAuth = new ClientOAuth2({
    clientId: process.env.BTC_CLIENT_ID,
    clientSecret: process.env.BTC_CLIENT_SECRET,
    accessTokenUri: 'https://github.com/login/oauth/access_token',
    authorizationUri: 'https://github.com/login/oauth/authorize',
    redirectUri: 'https://behind-the-code.herokuapp.com/auth/github/callback',
    // scopes: ['user', 'repo', 'public_repo'] // (no scope) - public read-only access (includes user profile info, public repo info, and gists).
})

app.set('port', (process.env.PORT || 5000)); // process.env.PORT is for Heroku instance

app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

// @deprecated - but maybe needed
// app.get('/properties', function(request, response) {
//     // GITHUB_TOKEN created manually by me, on Heroku control panel (configs)
//     response.send(process.env.GITHUB_TOKEN);
// });

//
// Below code, regarding OAuth and GitHub taken from:
// https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/
// https://github.com/mulesoft/js-client-oauth2
//

// app.get('/auth/github', cors(), function(req, res) {
app.get('/auth/github', function(req, res) {
    var uri = githubAuth.code.getUri()
    res.redirect(uri)
})

app.get('/auth/github/callback', function(req, res) {
    githubAuth.code.getToken(req.originalUrl)
        .then(function(user) {
            // console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }

            // // Refresh the current users access token.
            // user.refresh().then(function(updatedUser) {
            //     console.log(updatedUser !== user) //=> true
            //     console.log(updatedUser.accessToken)
            // })

            // // Sign API requests on behalf of the current user.
            // user.sign({
            //     method: 'get',
            //     url: 'https://behind-the-code.herokuapp.com'
            // })

            // console.log(user.accessToken);
            // This is kinda manual workaround, how to pass token to index.js. 
            // I feel, like there should be smarter approach
            res.redirect('/?access_token=' + user.accessToken);

            // From exmple: We should store the token into a database.
            // return res.send(user.accessToken)
            // res.sendFile(path.join(__dirname + '/index.html'+'?access_token='+user.accessToken));
        })
})

// app.get('/auth0_access_granted', function(request, response) {
//   	response.sendFile(path.join(__dirname+'/auth0.html'));
// });

// app.get('/oauth/github/callback', function(request, response) {
//   	response.sendFile(path.join(__dirname+'/oauth.html'));
// });

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
