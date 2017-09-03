// window.useUrl flag is used over the codebase, and where needed to decide use real URL or mocked JSON for data requests.

// .js ext still needed. !!!
import * as dataPromises from './js/dataPromises.js';
import * as bestOfJsApi from './js/use-best-of-js-org.js';
import * as gitHubApi3 from './js/use-github-v3.js';
import * as gitHubApi4 from './js/use-github-v4.js';

(function() {
    'use strict';

    dataPromises.getMyData.then(data => {
        // bestOfJsApi.getInfo(data);

        // var t = dataPromises.getMyTokenFunc();
        // console.log(t); // but here still Promise...

        dataPromises.getMyToken.then(tokenData => {
            // gitHubApi3.testApi(tokenData);
            gitHubApi3.getInfo(data, tokenData);
            // => "API rate limit exceeded for 89.64.1.254. 
            // (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"

            // gitHubApi4.testApi();
            // gitHubApi4.getInfo(data, tokenData);
        });

    });

}());
