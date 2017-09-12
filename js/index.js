// window.useUrl flag is used over the codebase, and where needed to decide use real URL or mocked JSON for data requests.

// import GitHub from '../bower_components/github-api/lib/GitHub.js'; // doesn't work in Chrome Canary
// var GitHub = require('github-api'); // from node_modules (using NodeJS env or RequireJS)

// .js ext still needed. !!!
import * as dataPromises from './dataPromises.js';
import * as bestOfJsApi from './use-best-of-js-org.js';
import * as gitHubApi3 from './use-github-v3.js';
import * as gitHubTools from './use-github-tools.js';
import * as gitHubApi4 from './use-github-v4.js';

// import bootstrap from './node_modules/bootstrap/dist/js/bootstrap.js';
// console.log(bootstrap);

(function() {
    'use strict';

    dataPromises.getMyData.then(repoData => {
        // bestOfJsApi.getInfo(data);

        // var t = dataPromises.getMyTokenFunc();
        // console.log(t); // but here still Promise...

        dataPromises.getMyToken.then(token => {
            if (!token){
                return;
            }
            console.log(token);
            // gitHubApi3.testApi(token);
            // gitHubApi3.getInfo(token, repoData);
            // => "API rate limit exceeded for 89.64.1.254. 
            // (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"
            
            // gitHubTools.testApiv3(token);
            // gitHubTools.getInfo(token, repoData);

            // gitHubApi4.testApi1(token);
            // gitHubApi4.testApi2(token);
            // gitHubApi4.testApi3(token);
            gitHubApi4.getInfo(token, repoData);
        });

    });

}());
