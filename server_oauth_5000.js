//
// https://github.com/scottgonzalez/connect-oauth-github
// 
const express = require("express");
const githubAuth = require("../../lib/oath"); // ??? => https://github.com/pelle/oauth

// Initialize the Express application
// The application must have sessions enabled
const app = express();
app.use(express.cookieParser());
app.use(express.cookieSession({
  secret: "your secret goes here"
}));

// Initialize the GitHub OAuth client
const gha = githubAuth.createClient({
  id: "your client id",
  secret: "your client secret"
});

// Add the route for the GitHub authorization callback
// The path must match authorization callback URL for the GitHub application
app.get("/auth", gha.handshake);

// Create a route which requires authorization
app.get("/required", gha.authorize, function(request, response) {
  const accessToken = gha.users[request.sessionID].accessToken;
  response.send("Your access token is " + accessToken);
});

// Create a route with optional authorization
app.get("/optional", function(request, response) {
  gha.isAuthorized(request, function(error, isAuthorized) {
    if (error) {
      response.send(500);
    }

    const name = isAuthorized ? gha.users[request.sessionID].accessToken : "anonymous";

    response.send("Hello, " + name);
  });
});

// Start listening for requests
app.listen(5000);
