//
// https://github.com/octokit/graphql.js
//
const graphql = require('@octokit/graphql');

const token = ''; // copy from browser

(async function() {
    'use strict';

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

    const options = {
        headers: {
            authorization: `token ${token}`
        }
    };

    const { repository } = await graphql(queryStr, options);

    console.log(JSON.stringify(repository, null, 4));
}());


// Do not use template literals in the query strings
// as they make your code vulnerable to query injection attacks (see #2). Use variables instead:
// https://github.com/octokit/graphql.js/issues/2

// const graphql = require('@octokit/graphql')
// const { lastIssues } = await graphql(`query lastIssues($owner: String!, $repo: String!, $num: Int = 3) {
//     repository(owner:$owner, name:$repo) {
//       issues(last:$num) {
//         edges {
//           node {
//             title
//           }
//         }
//       }
//     }
//   }`, {
//     owner: 'octokit',
//     repo: 'graphql.js'
//     headers: {
//       authorization: `token secret123`
//     }
//   }
// })

// const graphql = require('@octokit/graphql').defaults({
//     headers: {
//       authorization: `token secret123`
//     }
//   })
//   const { repository } = await graphql(`{
//     repository(owner:"octokit", name:"graphql.js") {
//       issues(last:3) {
//         edges {
//           node {
//             title
//           }
//         }
//       }
//     }
//   }`)