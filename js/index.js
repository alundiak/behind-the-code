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

    var cachedToken, cashedRepoData;

    dataPromises.getMyData.then(repoData => {
        cashedRepoData = repoData;

        // bestOfJsApi.getInfo(repoData);

        dataPromises.getMyToken.then(token => {
            if (!token) {
                return;
            }

            cachedToken = token;

            // gitHubApi3.testApi(token);
            // gitHubApi3.getInfo(token, repoData);

            // gitHubTools.testApiv3(token);
            // gitHubTools.getInfo(token, repoData);

            // gitHubApi4.testApi1(token);
            // gitHubApi4.testApi2(token);
            // gitHubApi4.testApi3(token);
            gitHubApi4.getInfo(token, repoData);
        });

    });

    $('.dropdown-menu').delegate('a', 'click', function(e) {
        let value = $(e.target).data('value');

        $('.dropdown span').text(value);
        switchApproach(value);
    });

    function switchApproach(value) {
        if (!cachedToken || !cashedRepoData) {
            return;
        }

        $('.list-group').html('');

        switch (value) {
            case 'githubApiv3':
                gitHubApi3.getInfo(cachedToken, cashedRepoData);
                break;

            case 'githubApiv3_wrapper':
                gitHubTools.getInfo(cachedToken, cashedRepoData);
                break;

            case 'githubApiv4':
            case 'default':
                gitHubApi4.getInfo(cachedToken, cashedRepoData);
                break;
        }
    }

}());
