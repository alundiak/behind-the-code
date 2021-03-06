//
// Test Helpers functions
//
export const apiUrl = 'https://api.github.com/graphql';

// http://myapi/graphql?query={me{name}}
// http://myapi/graphql?query={me{name}}&variables={myVar:\"alundiak\"}
export function apiTestGet(TOKEN) {
    const queryStr = '{repository(owner:"facebook",name:"react"){nameWithOwner}}';

    const options = {
        method: 'get',
        _headers: {
            'Content-Type': 'application/json'
        }
    }

    // TODO add variables
    // https://graphql.github.io/learn/queries/#variables
    fetch(apiUrl + '?access_token=' + TOKEN + `&query=${queryStr}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Returns some VERY generic GraphQL data
        });
}

// OPTIONS + POST
export function apiTestJson(TOKEN) {
    const queryObject = {
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

    // From Docs - for curl: " \
    // { \
    // \"query\": \"query { viewer { login }}\" \
    // } \
    // ";

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryObject)
    }

    fetch(apiUrl + '?access_token=' + TOKEN, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

export function apiTestVariables(TOKEN) {
    const queryStr = `
    query MyRepos($loginVar: String!) {
        repositoryOwner(login: $loginVar) {
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

    const variablesStr = `{
        "loginVar": "alundiak"
    }`;

    const bodyObject = {
        query: queryStr,
        variables: variablesStr
    }

    const options = {
        method: 'post',
        _headers: {
            'Content-Type': 'application/json' // if provided, then OPTIONS + POST
        },

        // body: queryStr
        // body: JSON.stringify(queryStr)
        // body: bodyObject
        body: JSON.stringify(bodyObject)
    }

    fetch(apiUrl + '?access_token=' + TOKEN, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

export function apiTestGraphql(TOKEN) {
    // Work both ways - with or without "query" before "{"
    const queryStr = `{
        repository(owner: "facebook", name: "react") {
            name
            nameWithOwner
            description
            createdAt
            updatedAt
            isFork
        }
    }`;

    const bodyObject = {
        query: queryStr
    };

    const options = {
        method: 'post',
        headers: { // even if no "headers", works anyway (but then only one POST)
            // 'Content-Type': 'application/json' // works anyway
            'Content-Type': 'application/graphql' // works anyway
        },

        // https://graphql.org/learn/serving-over-http/
        // body: queryStr // doesn't work - but should.

        // body: JSON.stringify(queryStr) // doesn't work
        // body: bodyObject // doesn't work=> [object Object]
        // body: escape(queryStr) // doesn't work
        // body: encodeURI(queryStr) // doesn't work
        body: JSON.stringify(bodyObject)
    }

    fetch(apiUrl + '?access_token=' + TOKEN, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

/**
 * Perform Ajax Request
 *
 * @param  {string} TOKEN     [description]
 * @param  {string} queryBody [description]
 *
 * @return {string}           [description]
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
    xhr.onload = function () {
        console.log(xhr.response.data);
    }

    const queryObject = {
        query: queryBody
    }

    xhr.send(JSON.stringify(queryObject)); // works well with all Content-Types
    // xhr.send(JSON.stringify(queryBody)); // doesn't work with any Content-Type
    // xhr.send({query: queryBody});  // doesn't work with any Content-Type
    // xhr.send(queryBody); // doesn't work with any Content-Type
}

/**
 *
 * @param {object | string} element
 */
export function parseMyData(element) {
    let owner, name;

    if (typeof element === 'string') {
        const splitted = element.split('/');
        [owner, name] = splitted;
    } else {
        ({ owner, name } = element);
    }

    return {
        owner,
        name
    }
}