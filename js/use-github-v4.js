// UPD 2019-06-12 - Looks like now GraphQL GitHub API has limit on how many fragments can be in one POST request
// I tried all - fail - 400 error.
// I tried different smaller sets - works.
import * as timelineVis from './timeline-vis.js';

export const apiUrl = 'https://api.github.com/graphql';

/**
 * @description Main function to get all info about GitHib repositories and render it on page.
 *
 * @param  {string} TOKEN
 * @param  {array} myData
 * @param  {boolean} renderList
 *
 * @return {void}
 */
export async function getInfo(TOKEN, myData, renderList) {
    // First token was generated on GitHub settings page, Sep-02-2017, for mostly read-only access.
    // I added it to js file content, and committed to repo.
    // Then I received email, about warning, that it's not ok.
    // So I regenerated token, and this time, put it into local, but hidden/ignored file 'token.json'
    // And when I need to use GitHub API v4, I use GET to fetch the token. Not yet sure if it's also incorrect from GitHub pov.
    if (!TOKEN) {
        return;
    }

    //
    // Approach 1 (old) - Single Request
    //
    // let queryBody = createRepositoriesQueryBody(myData);
    // const repos = await performRequest(TOKEN, queryBody, 'json'); // here it's function call, with returning Promise
    // const repos = performRequestOnlyOne(TOKEN, queryBody); // Sends only one POST request

    //
    // Approach 2 (new) - Split Requests
    //
    let position = 0;
    const repos = [];
    while (position < myData.length) {
        const dataChunk = myData.slice(position, position + 50); // 50 is experimental value, discovered via GraphQL Explorer
        position += dataChunk.length;
        let queryBody = createRepositoriesQueryBody(dataChunk);
        const reposChunk = await performRequest(TOKEN, queryBody, 'json');
        repos.push(reposChunk);
    }

    let data = convertToArrayAndSortByStars(repos);

    if (renderList) {
        renderListWithTemplate(data);
    } else {
        const container = document.getElementById('visualization');
        timelineVis.renderTimeLineViz(container, data, {
            clickToUse: true,
            verticalScroll: true,
            // horizontalScroll: false,
            // stack:true,
            orientation: 'top',
            // zoomKey: 'ctrlKey'
        });

        // timelineVis.attachExamples(data);
    }
}

function renderListWithTemplate(data) {
    const listGroupTemplate = document.getElementById('listGroupTemplate');
    if (!listGroupTemplate) {
        return;
    }

    for (let i = 0; i < data.length; i++) {
        const repoRecord = data[i];

        let str = `<span>
        <a href="${repoRecord.url}" target="_blank">${repoRecord.name}</a> owned by ${repoRecord.owner.login} (${repoRecord.owner.__typename}).
        Created ${moment(repoRecord.createdAt).format('YYYY/MM/DD')},
        Pushed ${moment(repoRecord.pushedAt).format('YYYY/MM/DD')},
        Updated: ${moment(repoRecord.updatedAt).format('YYYY/MM/DD')}
        </span>

        <span>
        Watchers: <span class="badge badge-secondary badge-pill">${repoRecord.watchers.totalCount}</span>
        </span>

        <span>
        Forks: <span class="badge badge-secondary badge-pill">${repoRecord.forks.totalCount}</span>
        </span>

        <span>
        Stars: <span class="badge badge-primary badge-pill">${repoRecord.stargazers.totalCount}</span>
        </span>`;

        const tmpl = listGroupTemplate.content.cloneNode(true);
        tmpl.querySelector('li').innerHTML = str;

        $('.list-group').append(tmpl);
    }

    $('.loader').hide();
}

/**
 * Create Repositories GraphQL Query Body
 *
 * @example - basic example using fragment and repository() aggregation - see idl/query2.idl
 *
 * @param  {array} myData [initial data for building GraphQL Query]
 * @return {string}       final string value of GraphQL Query
 */
export function createRepositoriesQueryBody(myData) {
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
                avatarUrl
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
    myData.forEach(function (repo, index) {
        // Note: repository() expects ONLY 2 fields: owner and name
        let lineTemplate = `repo${++index}: repository(name: "${repo.name}", owner: "${repo.owner}") { ...repositoryFragment }`;
        strings.push(lineTemplate);
    });

    let queryString = `
        {
            ${strings.join('\n')}
        }
    `;

    let queryBody = fragmentString + queryString;

    return queryBody;
}

/**
 * Fetch data from GitHub, with applying options.headers.
 * It goes plain/text, and as result OPTIONS => POST 2 requests.
 *
 * @param  {string} TOKEN       [description]
 * @param  {string} queryBody   [description]
 * @param  {string} contentType [description]
 * @return {Promise}             [description]
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
                console.log('ERROR', response);
            }
        })
        // .then(data => data.data)
        .then(({ data, errors }) => {
            if (errors && errors.length > 0) {
                console.log(errors[0].message, errors); // to attract attention
            }
            return data || {};
        });
}

/**
 * Fetch data from GitHub - ONLY 1 POST request
 *
 * If we want to have only one POST request, we need to fetch URL with param `access_token`
 * If during fetch, no options.headers then yes - POST request only one.
 *
 * @param  {string} TOKEN       [description]
 * @param  {string} queryBody   [description]
 * @param  {string} contentType [description]
 * @return {Promise}             [description]
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
                console.log('ERROR', response);
            }

        })
        .then(data => {
            return data.data;
        });
}

/**
 * Prepare GraphQL Request Options
 *
 * @param  {string} queryBody
 * @param  {string} contentType
 * @param  {string} TOKEN
 * @return {object}
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
            // 'Authorization': `${TOKEN}`, // doesn't work
            // 'Authorization': `AnyString ${TOKEN}`, // doesn't work
            // 'Authorization': `Bearer ${TOKEN}`, // also works
            'Authorization': `token ${TOKEN}`, // works
            'Content-Type': 'application/json' // if provided, then OPTIONS + POST. If commented, anyway OPTIONS + POST
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
        // if no options.headers - then ONLY POST (contentType = text/plain)
        // But GitHub API requires headers.Authorization at least
        // => 401 Error: "This endpoint requires you to be authenticated."
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


/**
 * Convert To Single flat Array and sort by stars
 *
 * @param {Array} finalRepositoriesData [Array of Objects of 50-limited fields with info about repositories.]
 */
function convertToArrayAndSortByStars(finalRepositoriesData) {
    const arr = [];

    //
    // If finalRepositoriesData is single Object
    //
    // for (let key in finalRepositoriesData) {
    //     if (!finalRepositoriesData[key]) {
    //         continue // so that not to push "null" to array
    //     }
    //     arr.push(finalRepositoriesData[key]);
    // }

    //
    // If finalRepositoriesData is single Array
    //
    for (let dataElem of finalRepositoriesData) {
        for (let key in dataElem) {
            if (!dataElem[key]) {
                continue // so that not to push "null" to array
            }
            arr.push(dataElem[key]);
        }
    }

    arr.sort(function (a, b) {
        if (!a || !b) {
            return 0;
        }
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

// no semicolon at the end!  if default
// Note that it is not possible to use var, let or const with export default.
