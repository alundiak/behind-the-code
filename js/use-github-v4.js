export const apiUrl = 'https://api.github.com/graphql';

export function getInfo() {
    // First token was generated on GitHub settings page, Sep-02-2017, for mostly read-only access. I added it to js file content, and committed to repo.
    // The I received email, about warning, that it's not ok.
    // So I regenerated token, and this time, put it into local, but hidden/ignored file 'token.json'
    // And when I need to use GitHub API v4, I use GET to fetch the token. Not yet sure if it's also incorrect from GitHub pov.

    fetch('data/properties') // url is related to web-root, not to the folder - location of file.
        .then(response => response.text())
        .then(tokenData => {
            console.log(tokenData);
        });
}

// no semicolon at the end!  if default
// Note that it is not possible to use var, let or const with export default.
