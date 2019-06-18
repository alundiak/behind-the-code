//
// https://github.com/octokit/rest.js
// https://octokit.github.io/rest.js/#usage
// https://developer.github.com/v3/repos
//

import { renderListRowv3 } from './use-github-v3.js'

export function getInfo(token, myData, renderList) {
    // Object "Octokit" from index.html
    const octokitInstance = Octokit({
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
        getUserRepos(element.owner, element.name)
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
