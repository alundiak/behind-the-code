const apiUrl = 'https://api.github.com/graphql';

export default function getInfo(TOKEN, myArrayOfRepositories) {
    let queryBody = createRepositoriesQueryBody(myArrayOfRepositories);
    let options = {
        method: 'post',
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: queryBody
        })
    };

    fetch(apiUrl, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.data); // GitHub API v4 returns in parent data object.
        });
}

function createRepositoriesQueryBody(myData) {
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
    return queryBody;
}
