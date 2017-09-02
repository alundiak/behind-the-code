Behind The Code
===
My Web Notes [2007-2017] about tools, libraries, frameworks and people...

## Goal

- Create (static) web page with content, like I've done for UI2HR.pptx for GL.
- Use then the page for article on @medium


## Tech details

- Use ES6 modules (export/import), since Chrome 60 (w/ flag), since 61 released.
- Use ES6 async function and Fetch API.
- Use GitHub Public API v3 or v4 (GraphQL). The REST API v3 has numerous endpoints; the GraphQL API v4 has a single endpoint: https://api.github.com/graphql
- Maybe use bestof.js.org Public JSONs. 

## Design

- Use vertical layout to show timeline from ~1990 till now.


## Browser Support

- Chrome 61+ (due to export/import)
- Not IE11 not even Edge (because Fetch API)
- 

## Resources

- https://css-tricks.com/using-fetch/
- https://github.com/toddmotto/public-apis - maybe
- https://developer.github.com/v3/ - GitHub Rest API v3
- https://developer.github.com/v4/ - GraphQL API v4
- https://github.com/RisingStack/risingstack-bootcamp
- https://githubengineering.com/the-github-graphql-api/ (since Sep-2016)
- https://bestof.js.org


## Credits

- Authors of BestOf.JS.Org
- Github API v4 (GraphQL)