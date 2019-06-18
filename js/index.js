// window.useUrl flag is used over the codebase, and where needed to decide use real URL or mocked JSON for data requests.

// import GitHub from '../bower_components/github-api/lib/GitHub.js'; // doesn't work in Chrome Canary
// var GitHub = require('github-api'); // from node_modules (using NodeJS env or RequireJS)

// ES6 Module import:
import * as dataPromises from './dataPromises.js';
import * as bestOfJsApi from './use-best-of-js-org.js';
import * as gitHubApi3 from './use-github-v3.js';
import * as gitHubTools from './use-github-tools.js';
import * as gitHubApi4 from './use-github-v4.js';
import * as gitHubApi4Helpers from './use-github-v4_helpers.js';

// doesn't work in browser because of CJS
// import Octokit from '../node_modules/@octokit/rest/lib/core.js';
// Also doesn't work
// import Octokit from '/lib/octokit-rest.js';

import * as gitOctokitRest from './use-octokit-rest.js';
import * as gitOctokitGraphql from './use-octokit-graphql.js';

// This doesn't work (CommonJS exported module)
// import bootstrap from './node_modules/bootstrap/dist/js/bootstrap.js';
// console.log(bootstrap);

async function main () {
    'use strict';

    let renderList = true;

    $('#disableRendering').on('change', function (e) {
        renderList = !this.checked;
    });

    $('#authorizeApp').on('click', function (e) { // should be before code line, where token is taken.
        window.location.href = '/auth/github';
    });

    const repoData = await dataPromises.getMyData(); // in fact it's just Promise
    const token = await dataPromises.getUserAccessToken(); // string value, stored in user's browser storage

    if (!token || !repoData) {
        return;
    }

    // Default approach
    // gitHubApi4.getInfo(token, repoData, false);
    gitOctokitGraphql.getInfo(token, repoData, false);

    const dataLength = repoData.length;
    $('.info .all').text(dataLength);
    $('.info .filtered').text(50);

    $('.dropdown-menu').delegate('a', 'click', function (e) {
        let value = $(e.target).data('value');

        $('.dropdown span').text(value);
        switchApproach(value);
    });

    function switchApproach(value) {
        if (!token || !repoData) {
            return;
        }

        $('#visualization').html('');
        $('.list-group').html('');
        $('.loader').show();

        switch (value) {
            case 'githubApiV3': // v3
                gitHubApi3.getInfo(token, repoData, renderList);
                break;

            case 'githubApiV3_wrapper': // v3
                gitHubTools.getInfo(token, repoData, renderList);
                break;

            case 'octokit/rest': // v3
                gitOctokitRest.getInfo(token, repoData, renderList);
                break;

            case 'githubApiV4': // v4
                gitHubApi4.getInfo(token, repoData, renderList);
                break;

            case 'octokit/graphql': // v4
            case 'default':
                gitOctokitGraphql.getInfo(token, repoData, renderList);
                break;
        }
    }
};

async function experiments() {
    const repoData = await dataPromises.getMyData();
    const token = await dataPromises.getUserAccessToken();

    if (!token || !repoData) {
        return false;
    }

    //
    // https://bestofjs.org/
    //
    // bestOfJsApi.getInfo(repoData);

    //
    // https://developer.github.com/v3/
    //
    // gitHubApi3.apiTest1(token);

    //
    // https://github.com/github-tools/github
    //
    // gitHubTools.apiTest1(token);

    //
    // https://developer.github.com/v4/
    //
    // gitHubApi4Helpers.apiTestGet(token);
    // gitHubApi4Helpers.apiTestJson(token);
    // gitHubApi4Helpers.apiTestVariables(token);
    // gitHubApi4Helpers.apiTestGraphql(token);

    //
    // https://github.com/octokit/rest.js
    //
    // gitOctokitRest.apiTest(token);

    //
    // https://github.com/octokit/graphql.js
    //
    // gitOctokitGraphql.apiTest(token);
}

main();
// experiments();
