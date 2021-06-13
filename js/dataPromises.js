export async function getMyData() {
    const data1 = await fetch('data/my-data.json').then(response => response.json());
    const data2 = await fetch('data/my-data-react.json').then(response => response.json());
    // return Promise.all([data1, data2])
    // return data2;
    return data1.concat(data2);
}

// url is related to web-root, not to the folder - location of file (if file ./properties exists).
// But in fact, this endpoint can be served by Express app, and then it reads process.env to get GITHUB_TOKEN from Heroku variables.
//
// On localhost:
// when server running via `http-server` => 8080, then /properties shows token value, which is exactly written in file `./properties` (git ignored)
// when server running via `node server.js` => 5000, then /properties shows undefined value in Chrome console for response,
// but POST requests to GitHub API v4 goes with correct token
//
// Used on localhost ONLY
export function getMyLocalToken() {
    return fetch('/properties').then(response => {
        if (response.ok) {
            return response.text();
        } else {
            return '';
        }
    })
}

/**
 * Function takes GET request query, parse it for access_token (my personal param name, not by GitHub)
 * Then stores in localStorage, so that later on, next page visit, re-use it, and not re-request grant to GitHub
 * Not sure how secured this, but at least it gives me basic flow I wanted.
 *
 * @return {[String]} OAuth token, received from GitHub redirection callback, but with my manual interception in NodeJS route
 */
export async function getUserAccessToken() {
    const localhost = window.location.hostname === 'localhost';
    const storedUserAccessToken = window.localStorage.getItem('userAccessToken');

    if (storedUserAccessToken) {
        // if authorized => disable button. Ideally should be some kind of method called gitHubAuth.isAuthorized() or similar.
        // But I will rely on simple fact of user having value in his localStorage

        $('#authorizeApp')
            .text('Authorized')
            .attr('disabled', true);
        return storedUserAccessToken;
    }

    // const searchParams = new window.URLSearchParams(location.search.slice(1));
    const searchParams = new window.URL(window.location.href).searchParams;
    // const code = searchParams.get('code');
    let token = searchParams.get('access_token');

    if (token) {
        // planned for Heroku instance usage
        window.localStorage.setItem('userAccessToken', token);
    } else if (localhost) {
        // planned for localhost only (but also still existed endpoint /properties on Express app)
        token = await getMyLocalToken(); // simple, resolved Promise.
    }

    return token || '';
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
