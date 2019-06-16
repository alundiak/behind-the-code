import {renderListRowv3} from './use-github-v3.js'

// import GitHub from '../bower_components/github-api/lib/GitHub.js'; // doesn't work in Chrome Canary
// var GitHub = require('github-api'); // from node_modules (using NodeJS env or RequireJS)

export function getInfo(TOKEN, myData, renderList) {
    let gh = getGitHubInstance(TOKEN);
    let clbck = function(err, data) {
        if (renderList){
            renderListRowv3(data);
        }
    }
    myData.forEach(function(element) {
        let requestableObject = getUserRepos(gh, element.owner, element.name, clbck);
        requestableObject.then(function(){
            $('.loader').hide();
        })
        // and yes, requestableObject is instanceof Promise.
    });
}

function getGitHubInstance(TOKEN) {
    // unauthenticated client
    // return new GitHub(); // can be used to create a anonymous gist for example

    // basic auth - the same - limited to POST requests per day. But with TOKEN provided no limits.
    return new GitHub({
        // username: 'alundiak',
        // password: 'TBD',
        // also acceptable:
        token: TOKEN // will cause sending header: `Authorization: token ....TOKEN_VALUE`
    });
    // Note
    // No matter if unauthenticated or basic auth or using TOEKN, GitHub Tools always sends 2 requests: OPTIONS + POST
}

export function apiTest1(TOKEN) {
    var gh = getGitHubInstance(TOKEN);
    // createGist(gh);
    // getUserStarredRepos(gh);
    // getUserNotifications(gh);
    getUserRepos(gh, 'alundiak', 'behind-the-code', function(err, data) {
        renderListRowv3(data);
    });
}

function getUserRepos(gh, user, repo, callback) {
    var ghUserRepo = gh.getRepo(user, repo);
    return ghUserRepo.getDetails(callback);
}

function createGist(gh) {
    let gist = gh.getGist(); // not a gist yet
    gist.create({
        public: true,
        description: 'Gist created using github-api',
        files: {
            'file1.txt': {
                content: 'TEST'
            }
        }
    }).then(function({
        data
    }) {
        // Promises!
        let createdGist = data;
        return gist.read();
    }).then(function({
        data
    }) {
        let retrievedGist = data;
        console.log(retrievedGist);
    });
}

function getUserStarredRepos(gh) {
    var ghUser = gh.getUser('alundiak');
    ghUser.listStarredRepos(function(err, repos) {
        console.log(repos, err);
    });
}

function getUserNotifications(gh) {
    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
    me.listNotifications(function(err, notifications) {
        console.log(notifications, err); // works - returns 50 records by default
    });
}
