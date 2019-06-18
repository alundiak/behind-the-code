//
// https://github.com/octokit/graphql.js
//

// Node/CJS
// const octokitGraphql = require('@octokit/graphql');

// Browser
// window.octokitGraphql

import {
    splitDataFetch,
    convertToArrayAndSortByStars,
    renderData
} from './use-github-v4.js';

export async function getInfo(token, myData, renderList) {
    const repos = await fetchGraphQlData(token, myData);

    let data = convertToArrayAndSortByStars(repos);

    renderData(data, renderList);
}

async function fetchGraphQlData(TOKEN, myData) {
    const graphql = octokitGraphql.defaults({
        headers: {
            authorization: `token ${TOKEN}`
        }
    });

    // const options = {}; // in case

    const octoGraphqlCallback = (queryBody) => {
        return graphql(queryBody/* , options */);
    };

    return splitDataFetch(myData, octoGraphqlCallback);
}

export async function apiTest(token) {
    const graphql = octokitGraphql.defaults({
        headers: {
            authorization: `token ${token}`
        }
    });

    const queryStr = `{
        repository(owner:"facebook", name:"react") {
            issues(last:3) {
            edges {
                node {
                title
                }
            }
            }
        }
    }`;

    // const options = {
    //     headers: {
    //         authorization: `token ${token}`
    //     }
    // };

    const { repository } = await graphql(queryStr/* , options */);

    console.log(repository);
}
