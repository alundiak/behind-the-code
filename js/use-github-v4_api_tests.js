//
// Test Helpers functions
//
export const apiUrl = 'https://api.github.com/graphql';

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

export async function apiTest2(TOKEN) {
    const owner = 'vuejs';
    const name = 'vue';
    let queryBody = `{
        repository(owner: "${owner}", name: "${name}") {
            name
            nameWithOwner
            description
            createdAt
            updatedAt
            isFork
        }
    }`;

    let options = {
        method: 'post',
        _headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/graphql'
        },
        // body: JSON.stringify(queryBody)
        body: queryBody
    }

    let response = await fetch(apiUrl + '?access_token=' + TOKEN, options)
        .then(response => response.json())
        .then(data => {
            console.log(data); // .repository
        });

    console.log(response);
}

export async function apiTest3(TOKEN) {
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
    let response = await performRequest(TOKEN, queryBody, 'graphql'); // doesn't work with GitHub, still require JSON.stringify()
    console.log(response);
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

    let queryObject = {
        query: queryBody
    }

    xhr.send(JSON.stringify(queryObject)); // works well with all Content-Types
    // xhr.send(JSON.stringify(queryBody)); // doesn't work with any Content-Type
    // xhr.send({query: queryBody});  // doesn't work with any Content-Type
    // xhr.send(queryBody); // doesn't work with any Content-Type
}