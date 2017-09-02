// .js ext still needed. !!!
import dataPromise from './js/getMyData.js'; 
import * as bestOfJsApi from './js/use-best-of-js-org.js';
import * as gitHubApi3 from './js/use-github-v3.js';
import * as gitHubApi4 from './js/use-github-v4.js';

(function() {
    'use strict';

	dataPromise.then(data => {
		// bestOfJsApi.getInfo(data);
		
		// gitHubApi3.testApi();
		gitHubApi3.getInfo(data);
		
		// gitHubApi4.testApi();
		gitHubApi4.getInfo(data);
    });

}());
