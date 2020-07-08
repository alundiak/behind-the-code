//
// https://github.com/octokit/rest.js
// https://octokit.github.io/rest.js/#usage
// https://developer.github.com/v3/repos
//

// before 2020
// doesn't work in browser because of CJS
// import Octokit from '../node_modules/@octokit/rest/lib/core.js';
// Also doesn't work
// import Octokit from '/lib/octokit-rest.js';

// 2020-07-09
// https://octokit.github.io/rest.js/v18
import { Octokit } from "https://cdn.pika.dev/@octokit/rest";

import { renderListRowv3 } from './use-github-v3.js'
import { parseMyData } from './use-github-v4_helpers.js';

export function getInfo(token, myData, renderList) {
    // Function "Octokit" from index.html
    const octokitInstance = new Octokit({
        auth: token,
        userAgent: 'Behind The Code v1.2.3'
    });

    const getUserRepos = async (owner, repo) => {
        const customRepo = await octokitInstance.repos.get({
            owner,
            repo
        });

        if (renderList) {
            renderListRowv3(customRepo.data);
        }
    }

    myData.forEach(function (element) {
        const { owner, name } = parseMyData(element);
        getUserRepos(owner, name)
            .then(function () {
                // yes, every row rendered, and then Promise resolved.
                // TODO implement hiding AFTER ALL rows rendered
                $('.loader').hide();
            });
        // and yes, getUserRepos returns instance of Promise.
    });
}

export const apiTest = async (token) => {
    // Object "Octokit" from index.html
    const octokitInstance = Octokit({
        auth: token,
        userAgent: 'Behind The Code v1.2.3'
    });

    // const { data: pullRequest } = await octokitInstance.pulls.get({
    //     owner: 'facebook',
    //     repo: 'react',
    //     pull_number: 123
    // });
    // console.log(pullRequest); // works

    // const myRepos = await octokitInstance.repos.listForUser({
    //     username: 'alundiak'
    // });
    // console.log(myRepos); // works

    // const publicRepos = await octokitInstance.repos.listPublic();
    // console.log(publicRepos); // works

    const customRepo = await octokitInstance.repos.get({
        owner: 'facebook',
        repo: 'react'
    });
    console.log(customRepo);
}
