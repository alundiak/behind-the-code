const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config() // for usage env file as extension to process.env variables

const ClientOAuth2 = require('client-oauth2')

const githubAuth = new ClientOAuth2({
  clientId: process.env.BTC_CLIENT_ID,
  clientSecret: process.env.BTC_CLIENT_SECRET,
  accessTokenUri: 'https://github.com/login/oauth/access_token',
  authorizationUri: 'https://github.com/login/oauth/authorize',
  redirectUri: 'https://behind-the-code.herokuapp.com/auth/github/callback',
  // redirectUri: 'http://localhost:5000/auth/github/callback', // works ONLY if github app BTC changed (https://github.com/settings/applications/593449)
  // scopes: ['user', 'repo', 'public_repo'] // (no scope) - public read-only access (includes user profile info, public repo info, and gists).
})

app.set('port', (process.env.PORT || 5000)); // process.env.PORT is for Heroku instance

app.use(express.static(__dirname + '/'));

// Taken from: https://github.com/graphql/express-graphql/issues/14#issuecomment-434133865
// ODD. Because with this .use() CORS error exists in console on localhost for main /graphql load !!!.
// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   optionsSuccessStatus: 200 /* some legacy browsers (IE11, various SmartTVs) choke on 204 */ ,
// }))

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


// app.get('/auth/github', cors(), function(req, res) { // UPD: Not sure if it's even needed.
app.get('/auth/github', function(req, res) {
  const uri = githubAuth.code.getUri()
  res.redirect(uri)
})

app.get('/auth/github/callback', function(req, res) {
  githubAuth.code.getToken(req.originalUrl)
    .then(function(user) {
      // console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }

      // getReposWithOctKitGraphql(user.accessToken); // TODO - improve

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

      // From example: We should store the token into a database.
      // return res.send(user.accessToken)
      // res.sendFile(path.join(__dirname + '/index.html'+'?access_token='+user.accessToken));
    })
})

// app.get('/auth0_access_granted', function(request, response) {
//    response.sendFile(path.join(__dirname+'/auth0.html'));
// });

// app.get('/oauth/github/callback', function(request, response) {
//    response.sendFile(path.join(__dirname+'/oauth.html'));
// });


// TODO - improve.
async function getReposWithOctKitGraphql(token) {
  const graphql = require('@octokit/graphql').defaults({
    headers: {
      authorization: `token ${token}`
    }
  })

  const { data } = await graphql(`
  fragment repositoryFragment on Repository {
    name
    nameWithOwner
    owner {
      avatarUrl
    }
    homepageUrl
    url
  }

  {
    repo1: repository(owner: "twbs", name: "bootstrap") { ...repositoryFragment }
    repo2: repository(owner: "jashkenas", name: "backbone") { ...repositoryFragment }
    repo3: repository(owner: "jashkenas", name: "underscore") { ...repositoryFragment }
    repo4: repository(owner: "marionettejs", name: "backbone.marionette") { ...repositoryFragment }
    repo5: repository(owner: "facebook", name: "react") { ...repositoryFragment }
    repo6: repository(owner: "facebook", name: "react-native") { ...repositoryFragment }
    repo7: repository(owner: "jquery", name: "jquery") { ...repositoryFragment }
    repo8: repository(owner: "angular", name: "angular") { ...repositoryFragment }
    repo9: repository(owner: "vuejs", name: "vue") { ...repositoryFragment }
    repo10: repository(owner: "gruntjs", name: "grunt") { ...repositoryFragment }
    repo11: repository(owner: "d3", name: "d3") { ...repositoryFragment }
    repo12: repository(owner: "c3js", name: "c3") { ...repositoryFragment }
    repo13: repository(owner: "reduxjs", name: "redux") { ...repositoryFragment }
    repo14: repository(owner: "nodejs", name: "node") { ...repositoryFragment }
    repo15: repository(owner: "npm", name: "npm") { ...repositoryFragment }
    repo16: repository(owner: "Microsoft", name: "TypeScript") { ...repositoryFragment }
    repo17: repository(owner: "less", name: "less.js") { ...repositoryFragment }
    repo18: repository(owner: "sass", name: "sass") { ...repositoryFragment }
    repo19: repository(owner: "electron", name: "electron") { ...repositoryFragment }
    repo20: repository(owner: "facebook", name: "jest") { ...repositoryFragment }
    repo21: repository(owner: "mongodb", name: "mongo") { ...repositoryFragment }
    repo22: repository(owner: "karma-runner", name: "karma") { ...repositoryFragment }
    repo23: repository(owner: "jasmine", name: "jasmine") { ...repositoryFragment }
    repo24: repository(owner: "webpack", name: "webpack") { ...repositoryFragment }
    repo25: repository(owner: "rollup", name: "rollup") { ...repositoryFragment }
    repo26: repository(owner: "expressjs", name: "express") { ...repositoryFragment }
    repo27: repository(owner: "babel", name: "babel") { ...repositoryFragment }
    repo28: repository(owner: "ariya", name: "phantomjs") { ...repositoryFragment }
    repo29: repository(owner: "mochajs", name: "mocha") { ...repositoryFragment }
    repo30: repository(owner: "chaijs", name: "chai") { ...repositoryFragment }
    repo31: repository(owner: "moment", name: "moment") { ...repositoryFragment }
    repo32: repository(owner: "requirejs", name: "requirejs") { ...repositoryFragment }
    repo33: repository(owner: "wycats", name: "handlebars.js") { ...repositoryFragment }
    repo34: repository(owner: "ReactiveX", name: "rxjs") { ...repositoryFragment }
    repo35: repository(owner: "Dogfalo", name: "materialize") { ...repositoryFragment }
    repo36: repository(owner: "semantic-org", name: "semantic-ui") { ...repositoryFragment }
  }`)

  console.log(data);
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});