// https://octokit.github.io/rest.js/
const Octokit = require('@octokit/rest');

const octokitInstance = new Octokit();

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
octokitInstance.repos.listForOrg({
    org: 'facebook',
    type: 'public'
}).then(({ data }) => {
    console.log(data)
})
