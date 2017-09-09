// To run within `node ./index.js`
import GitHub from 'github-api';

var gh = new GitHub({});

var clayreimann = gh.getUser('clayreimann');
clayreimann.listStarredRepos(function(err, repos) {
   console.log(JSON.stringify(repos.length) + ' started repos');
});