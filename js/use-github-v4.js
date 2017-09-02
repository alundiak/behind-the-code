export const apiUrl = 'https://api.github.com/graphql';

/**
 * @param  myData {Array}
 * @param  TOKEN {String}
 * @return {Promise?}
 */
export function getInfo(myData, TOKEN) {
    // First token was generated on GitHub settings page, Sep-02-2017, for mostly read-only access. I added it to js file content, and committed to repo.
    // The I received email, about warning, that it's not ok.
    // So I regenerated token, and this time, put it into local, but hidden/ignored file 'token.json'
    // And when I need to use GitHub API v4, I use GET to fetch the token. Not yet sure if it's also incorrect from GitHub pov.

    // TODO
}

export function testApi(TOKEN) {

}

// no semicolon at the end!  if default
// Note that it is not possible to use var, let or const with export default.
