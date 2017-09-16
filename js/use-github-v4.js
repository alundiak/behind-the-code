export const apiUrl = 'https://api.github.com/graphql';

/**
 * @param  TOKEN {String}
 * @param  myData {Array}
 * @return {Promise?}
 */
export function getInfo(TOKEN, myData, renderList) {
    if (!TOKEN) {
        return;
    }
    // First token was generated on GitHub settings page, Sep-02-2017, for mostly read-only access. 
    // I added it to js file content, and committed to repo.
    // Then I received email, about warning, that it's not ok.
    // So I regenerated token, and this time, put it into local, but hidden/ignored file 'token.json'
    // And when I need to use GitHub API v4, I use GET to fetch the token. Not yet sure if it's also incorrect from GitHub pov.

    getRepositories(TOKEN, myData)
        .then(data => {
            if (renderList === false) {
                return;
            }

            data = conertToArrayAndSortByStars(data);

            if (Array.isArray(data)) {
                //
                // data is ARRAY
                // 
                data.forEach(function(repo) {
                    renderListRowv4(repo);
                });
            } else {
                //
                // data is OBJECT
                // 
                // for...in for enumerable objects. Return indexes.
                for (let key in data) {
                    renderListRowv4(data[key])
                }
            }
        });
}

function conertToArrayAndSortByStars(data) {
    var arr = [];
    for (let key in data) {
        arr.push(data[key]);
    }
    arr.sort(function(a, b) {
        if (a.stargazers.totalCount < b.stargazers.totalCount) {
            return 1;
        }
        if (a.stargazers.totalCount > b.stargazers.totalCount) {
            return -1;
        }
        return 0;
    })

    return arr;
}

function renderListRowv4(data) {
    let str = `<span>
        <a href="${data.url}" target="_blank">${data.name}</a> owned by ${data.owner.login} (${data.owner.__typename}). 
        Created ${moment(data.createdAt).format('YYYY/MM/DD')}, 
        Pushed ${moment(data.pushedAt).format('YYYY/MM/DD')}, 
        Updated: ${moment(data.updatedAt).format('YYYY/MM/DD')}
        </span>

        <span>
        Watchers: <span class="badge badge-secondary badge-pill">${data.watchers.totalCount}</span>
        </span>

        <span>
        Forks: <span class="badge badge-secondary badge-pill">${data.forks.totalCount}</span> 
        </span>
        
        <span>
        Stars: <span class="badge badge-primary badge-pill">${data.stargazers.totalCount}</span>
        </span>`;

    let li = $('<li class="list-group-item d-flex justify-content-between align-items-center">').html(str);
    $('.list-group').append(li);
}

export function apiTest1(TOKEN) {
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

    // for curl: " \
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
    }

    fetch(apiUrl + '?access_token=' + TOKEN, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

export function apiTest2(TOKEN) {
    // getRepositoryInfoByOwnerAndName(TOKEN, 'facebook','react');
    getRepositoryInfoByOwnerAndName(TOKEN, 'vuejs', 'vue');
}

export function apiTest3(TOKEN) {
    let queryBody = `
        {
            repository(owner: "facebook", name: "react") {
                name
            }
        }
    `;

    let queryObject = {
        query: queryBody
    };

    // performAjaxRequest(TOKEN, queryBody);
    // performRequestOnlyOne(TOKEN, queryBody);

    // let promise = performRequest(TOKEN, queryBody);
    // promise.onload = function(a){
    //     console.log('TODO - check request performance', a);
    // }
    // performRequest(TOKEN, queryBody,'json'); // 
    performRequest(TOKEN, queryBody, 'graphql'); // doesn't work with GitHub, still require JSON.stringify()
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
 * @param  {[String]} TOKEN  [description]
 * @param  {[Array]} myData [description]
 * @return {[Promise]}        [description]
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
            homepageUrl
            url
            projectsUrl
        }
    `;
    // updatedAt - @deprecated

    let strings = [];
    myData.forEach(function(repo, index) {
        let lineTemplate = `repo${++index}: repository(owner: "${repo.owner}", name: "${repo.name}") { ...repositoryFragment }`;
        strings.push(lineTemplate);
    });

    let queryString = `
        {
            ${strings.join('\n')}
        }
    `;

    let queryBody = fragmentString + queryString;

    // return performRequest(TOKEN, queryBody); // 401 Error: "This endpoint requires you to be authenticated."
    return performRequest(TOKEN, queryBody, 'json');
    // return performRequestOnlyOne(TOKEN, queryBody);
}

/**
 * With applying options.headers, it goes plain/text, and as result OPTIONS => POST 2 requests.
 * 
 * @param  {[type]} TOKEN       [description]
 * @param  {[type]} queryBody   [description]
 * @param  {[type]} contentType [description]
 * @return {[type]}             [description]
 */
function performRequest(TOKEN, queryBody, contentType) {
    let graphqlOptions = prepareGraphqlOptions(queryBody, contentType, TOKEN);
    if (!graphqlOptions || !TOKEN) {
        return;
    }
    return fetch(apiUrl, graphqlOptions)
        .then(response => {
            // let contentType = response.headers.get('content-type')
            // let accept = response.headers.get('accept')
            // if (contentType.includes('application/json')) {
            //     return response.json()
            // }
            if (response.ok) {
                return response.json();
            } else {
                return 'ERROR';
            }

        })
        // .then(data => data.data)
        .then(data => {
            // console.log(data);
            return data.data;
        });
}

/**
 * If we want to have only one POST request, we need to fetch URL with param `access_token`
 * If during fetch, no options.headers then yes - POST request only one.
 * 
 * @param  {[type]} TOKEN       [description]
 * @param  {[type]} queryBody   [description]
 * @param  {[type]} contentType [description]
 * @return {[type]}             [description]
 */
function performRequestOnlyOne(TOKEN, queryBody, contentType) {
    let graphqlOptions = prepareGraphqlOptions(queryBody, contentType, TOKEN);
    if (!graphqlOptions || !TOKEN) {
        return;
    }
    return fetch(apiUrl + '?access_token=' + TOKEN, graphqlOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return 'ERROR';
            }

        })
        .then(data => {
            return data.data;
        });
}

/**
 * [performAjaxRequest description]
 * @param  {[type]} TOKEN     [description]
 * @param  {[type]} queryBody [description]
 * @return {[type]}           [description]
 */
function performAjaxRequest(TOKEN, queryBody) {
    var xhr = new window.XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', apiUrl + '?access_token=' + TOKEN);
    // If we provide Content-Type then we have OPTIONS (204) + POST (200) requests. If no content type, just POST (200)
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('Content-Type', 'application/graphql');
    // 
    // xhr.setRequestHeader('Accept', 'application/json'); // not yet sure why this needed
    xhr.onload = function() {
        console.log(xhr.response.data);
    }

    let queryObject = {
        query: queryBody
    }

    xhr.send(JSON.stringify(queryObject)); // works well with all Content-Types
    // xhr.send(JSON.stringify(queryBody)); // doesn't work with any Content-Type
    // xhr.send({query: queryBody});  // doesn't work with any Content-Type
    // xhr.send(queryBody); // doesn't work with any Content-Type
}

/**
 * [prepareGraphqlOptions description]
 * @param  {[type]} queryBody   [description]
 * @param  {[type]} contentType [description]
 * @param  {[type]} TOKEN       [description]
 * @return {[type]}             [description]
 */
function prepareGraphqlOptions(queryBody, contentType, TOKEN) {
    if (!queryBody) {
        return;
    }

    let queryObject = {
        query: queryBody
    };

    let options = {
        method: 'post'
    };

    if (contentType === 'json') {
        options.headers = {
            // 'Accept': 'application/json', // looks no effect
            'Authorization': `token ${TOKEN}`,
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(queryObject);
    } else if (contentType === 'graphql') {
        options.headers = {
            // 'Accept': 'application/json', // looks no effect
            'Authorization': `token ${TOKEN}`,
            'Content-Type': 'application/graphql' // not sure if it works. As far as I tested - nothing changed.
        };
        options.body = JSON.stringify(queryObject); // Based on xhr example, should be stringified object with "query"
        // options.body = JSON.stringify(queryBody); // will cause parse error "Problems parsing JSON"
        // options.body = queryBody // will cause parse error "Problems parsing JSON"
    } else {
        // options.headers = {
        //     'Authorization': `token ${TOKEN}`
        // };
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
