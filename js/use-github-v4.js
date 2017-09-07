/* eslint-disable indent, no-tabs, no-mixed-spaces-and-tabs */

export const apiUrl = 'https://api.github.com/graphql';

/**
 * @param  TOKEN {String}
 * @param  myData {Array}
 * @return {Promise?}
 */
export function getInfo(TOKEN, myData) {
    // First token was generated on GitHub settings page, Sep-02-2017, for mostly read-only access. 
    // I added it to js file content, and committed to repo.
    // Then I received email, about warning, that it's not ok.
    // So I regenerated token, and this time, put it into local, but hidden/ignored file 'token.json'
    // And when I need to use GitHub API v4, I use GET to fetch the token. Not yet sure if it's also incorrect from GitHub pov.

    getRepositories(TOKEN, myData)
        .then(data => {
            console.log(data);
            if (Array.isArray(data)) {
                //
                // data is ARRAY
                // 
                data.forEach(function(repo) {
                    renderList(repo);
                });
            } else {
                //
                // data is OBJECT
                // 
                // for...in for enumerable objects. Return indexes.
                for (let key in data) {
                    renderList(data[key])
                }
            }
        });
}

function renderList(data) {
    let str = `${data.name} owned by ${data.owner.login} (${data.owner.__typename}) 
        and has 
        <span class="badge badge-primary badge-pill">${data.stargazers.totalCount}</span> stars,  
        <span class="badge badge-primary badge-pill">${data.watchers.totalCount}</span> watchers, 
        <span class="badge badge-primary badge-pill">${data.forks.totalCount}</span> forks. 
        Created ${moment(data.createdAt).format('YYYY/MM/DD')}, 
        Pushed ${moment(data.pushedAt).format('YYYY/MM/DD')}, 
        Updated: ${moment(data.updatedAt).format('YYYY/MM/DD')}`;

    let li = $('<li class="list-group-item d-flex justify-content-between align-items-center">').html(str);
    $('.list-group').append(li);
}

export function testApi1(TOKEN) {
    let queryObject = {
        query: `{
          repositoryOwner(login: "alundiak") {
            repositories(first: 30) {
              edges {
                org: node {
                  name
                }
              }
            }
          }
        }`
    };

    // after stringifying
    // {
    //     "query": "{\n\t\t  repositoryOwner(login: \"alundiak\") {\n\t\t    repositories(first: 30) {\n\t\t      edges {\n\t\t       
    //      org: node {\n\t\t          name\n\t\t        }\n\t\t      }\n\t\t    }\n\t\t  }\n\t\t}"
    // }

    let graphqlString = `
    {
        repositoryOwner(login: "alundiak") {
            repositories(first: 30) {
                edges {
                    org: node {
                        name
                    }
                }
            }
        }
    }
    `;

    // let str = " \
    // { \
    // \"query\": \"query { viewer { login }}\" \
    // } \
    // ";

    let options = {
        method: 'post',
        _headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/graphql'
        },
        body: JSON.stringify(queryObject)

        // body: graphqlString
        // body: escape(graphqlString)
        // body: encodeURI(graphqlString)
        // body: JSON.stringify(graphqlString)

        // body: str
    }

    fetch(apiUrl + '?access_token=' + TOKEN, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

export function testApi2(TOKEN) {
    // getRepositoryInfoByOwnerAndName(TOKEN, 'facebook','react');
    getRepositoryInfoByOwnerAndName(TOKEN, 'vuejs', 'vue');
}

function getRepositoryInfoByOwnerAndName(TOKEN, owner, name) {
    let queryBody1 = `{
       repository(owner: "${owner}", name: "${name}") {
           name
           nameWithOwner
           description
           createdAt
           updatedAt
           isFork
       }
   }`;

    return performRequest(TOKEN, queryBody1).then(data => {
        // console.log(data.repository);
        return data.repository;
    })
}

/**
 * [getRepositories description]
 *
 * @example - basic example using fragment and repository() aggregation - see idl/query2.idl
 * 
 * @param  {[type]} TOKEN  [description]
 * @param  {[type]} myData [description]
 * @return {[type]}        [description]
 */
function getRepositories(TOKEN, myData) {
    let fragmentString = `
        fragment repositoryFragment on Repository {
            name
            nameWithOwner
            description
            createdAt
            updatedAt
            pushedAt
            isFork
            forks {
                totalCount
            }
            viewerHasStarred
            viewerSubscription
            owner {
                login
                __typename
            }
            stargazers {
                totalCount
            }
            watchers {
                totalCount
            }
        }
    `;
    // updatedAt - @deprecated

    let strings = [];
    myData.forEach(function(repo, index) {
        let lineTemplate = `repo${++index}: repository(owner: "${repo.owner}", name: "${repo.name}") { ...repositoryFragment }`;
        strings.push(lineTemplate);
    });

    let queryString = `
        query {
            ${strings.join('\n')}
        }
    `;

    let queryBody = fragmentString + queryString;

    return performRequest(TOKEN, queryBody);
}

function performRequest(TOKEN, queryBody, contentType) {
    let graphqlOptions = prepareGraphqlOptions(queryBody, contentType);
    if (!graphqlOptions) {
        return;
    }
    return fetch(apiUrl + '?access_token=' + TOKEN, graphqlOptions)
        .then(response => response.json())
        .then(data => {
            return data.data;
        });
}

function prepareGraphqlOptions(queryBody, type) {
    if (!queryBody) {
        return;
    }

    let queryObject = {
        query: queryBody
    };

    let options = {
        method: 'post'
    };

    if (type === 'json') {
        options.headers = {
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(queryObject);
        // options.body = queryObject // ??
    } else if (type === 'graphql') {
        options.headers = {
            'Content-Type': 'application/graphql'
        };
        options.body = JSON.stringify(queryBody); // ??
        // options.body = queryBody // ??
    } else {
        options.body = JSON.stringify(queryObject);
    }

    return options;

    /*
    http://graphql.org/learn/serving-over-http/ =>

    A standard GraphQL POST request should use the application/json content type, and include a JSON-encoded body of the following form:

    {
      "query": "...",
      "operationName": "...",
      "variables": { "myVariable": "someValue", ... }
    }
    operationName and variables are optional fields. operationName is only required if multiple operations are present in the query.

    If the "application/graphql" Content-Type header is present, treat the HTTP POST body contents as the GraphQL query string.
    */
}

// no semicolon at the end!  if default
// Note that it is not possible to use var, let or const with export default.
