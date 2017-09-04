# A simple place, to collect a few helpfull GitHub API v4 queries

## My GitHub API forum topic(s):

- https://platform.github.community/t/list-repositories-filtered-by-owner-and-repo-name/3172?u=alundiak


## Examples

### Get my (user) repositories

```
query {
  repositoryOwner(login: "alundiak") {
    repositories(first: 30) {     
      edges {
        org: node {          
          name    # and whatever else you need...       
        }
      }
    }
  }
}
```

### Another way to get my repositories:

```
query {
  user(login: "alundiak") {
    repositories(last:10) {
      nodes {
        name
      }
    }
  }
}
```


### Get issues on repo:

```
query {
  repository(owner:"facebook", name:"react") {
    issues(last:20, states:CLOSED) {
      edges {
        node {
          title
          url
          labels(first:5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
```

### Getting contributedRepositories

- https://platform.github.community/t/add-your-schema-requests/25/36?u=alundiak

```
query {
  viewer {
    contributedRepositories(first:10) {
      edges {
        repository: node {
          name
          owner { 
            login
          }
        }
      }
    }
  }
}
```


###  Getting repositories by affiliations

- https://platform.github.community/t/add-your-schema-requests/25/82?u=alundiak

```
query {
  viewer {
    repositories(last:30,affiliations:[OWNER,COLLABORATOR,ORGANIZATION_MEMBER]) {
      edges {
        node {
          description
          name
          createdAt
          updatedAt
          nameWithOwner
          isFork
        }
      }
    }
  }
}
```

### Get custom user repositories.

- https://platform.github.community/t/add-your-schema-requests/25/48?u=alundiak

```
query {
     repository(owner: "octokit", name: "octokit.rb") {
        pullRequests(number: "1") {
          edges {
            node {
              number
            }
          }
        }
    }
}
```

Error: `"Field 'pullRequests' doesn't accept argument 'number'",`



### Looks like search by topic.

```
query {  
  search(first: 1, query: "Subvisual", type: USER) {
    edges {
      node {
        ... on Organization {
          repositories(first: 10) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
```

### Get repositories by type

- https://platform.github.community/t/list-all-repositories-whose---typename-organization/2826/2?u=alundiak

A bit modified and executed in GraphQL Explorer:

```
query {
  facebook: organization(login:"facebook") {
    ...OrganizationFields
  }
  
  angular: organization(login:"angular") {
    ...OrganizationFields
  }
}

fragment OrganizationFields on Organization {
  repositories(last:100) {
    nodes {
      name
      stargazers (first: 1) {
        edges {
          node {
            id
          }
        }
      }
      watchers(first: 1) {
        edges {
          node {
            id
          }
        }
      }
      updatedAt
      createdAt
    }
  }
}
```

### Search repositories by query

- https://platform.github.community/t/can-i-query-repos-showing-their-star-counts-from-a-code-search-with-the-graphql-api/1310/3?u=alundiak

```
query {
  search(query: "this should never happen", type: REPOSITORY, last:30) {
    edges {
      node {
        ... on Repository {
          name
          owner {
            login
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}
```

### Get repository by URL:

- https://platform.github.community/t/look-up-repository-by-url-instead-of-by-owner-and-name/2086/2?u=alundiak

```
query {
  resource(url:"https://github.com/rails/rails") {
    ... on Repository {
      name
      owner {
        login
      }
    }
  }
}
```

### Get Forked repositories:

- https://platform.github.community/t/list-non-forked-repositories-only/336/4?u=alundiak

```
query {
  repositoryOwner(login:"facebook") {
    repositories(first: 3, isFork: false, privacy: PUBLIC, orderBy: { field: CREATED_AT, direction: DESC }) {
      edges {
        node {
          name
        }
      }
    }
  }
}
```


### Other

- https://platform.github.community/t/find-the-most-starred-repositories-created-in-the-last-week/1333/3

If you want to get the most starred repos of all time:

```
https://api.github.com/search/repositories?q=stars:>1&sort=stars
```

- https://stackoverflow.com/questions/30525330/how-to-get-list-of-trending-github-repositories-by-github-api3

If you want in the past 7 days



