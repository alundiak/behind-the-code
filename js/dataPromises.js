export var getMyData = fetch('data/my-data.json').then(response => response.json());

// url is related to web-root, not to the folder - location of file.
export var getMyToken = fetch('data/properties').then(response => {
    if (response.ok){
        return response.text();
    } else {
        // TODO GitHub App Registration 
        return '';
    }
})

// await works only inside of async function

/**
 * @deprecated
 * @return {Promise}
 */
export async function getMyTokenFunc() {
    var a = await fetch('data/properties')
        .then(response => response.text())
        // If we use then() and NOT return data, it return/pass undefined for any next .then() calls. 
        // Also, we can change data by passing from .then() to next .then()
        // .then(tokenData => {
        //     // return tokenData + '_my_changed_token';
        //     return tokenData;
        // })

    console.log(a); // string value
    return a;
}

/*
 eslint: no-return-await
 Inside an async function, return await is useless. 
 Since the return value of an async function is always wrapped in Promise.resolve, 
 return await doesn’t actually do anything except add extra time before the overarching Promise resolves or rejects. 
 This pattern is almost certainly due to programmer ignorance of the return semantics of async functions.
 */

export function mockGitHubApiCall() {
    // todo - return once fetched JSON for every endpoint
}
