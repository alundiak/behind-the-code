Behind The Code
===
My Web Notes [2007-2017] about tools, libraries, frameworks and people...

## Goal

- Create (static) web page with content, like I've done for UI2HR.pptx for GL.
- Represent next entities: 
-- repo author/maintainer, guess it's `commits[].author.site_admin = true`
-- first commit date ("since" date), 
-- last commit date ("update" date), 
- Use then the page for article on @medium


## Tech details

- Use ES6 modules (export/import), since Chrome 60 (w/ flag), since 61 released.
- Use ES6 async function and Fetch API.
- Use ES6 String/Template literals
- Use GitHub Public API v3 or v4 (GraphQL). The REST API v3 has numerous endpoints; the GraphQL API v4 has a single endpoint: https://api.github.com/graphql
- Maybe use bestof.js.org Public JSONs.
- GraphQL http://graphql.org/code/#javascript

## Design

- Use vertical layout to show timeline from ~1990 till now.


## Browser Support

- Modularization (export/import): Chrome 61+ (Canary), -Chrome 60, -Firefox
- Fetch API: Chrome+, Firefox+, Safari+, Opera+, Edge+, IE11-
- HTML Imports: Chrome+, Opera, Firefox-, IE11-, Edge-
- Template Literals: Chrome+, Firefox+, Safari+, Opera+, -IE11, Edge+
- Async functions: Chrome+, Firefox+, Safari+, Opera+, -IE11, Edge+

## Notes

- HTML imports works, but JS files are loaded later, than simple HTML inside inside of main index.html file. Somtimes MomentJS is not yet available. 

## Resources

- https://css-tricks.com/using-fetch/
- https://github.com/toddmotto/public-apis - maybe
- https://developer.github.com/v3/ - GitHub Rest API v3
- https://developer.github.com/v4/ - GraphQL API v4
- https://github.com/RisingStack/risingstack-bootcamp
- https://githubengineering.com/the-github-graphql-api/ (since Sep-2016)
- https://bestof.js.org
- https://www.digitalocean.com/community/questions/what-is-the-difference-between-an-api-token-and-a-personal-token
- https://github.com/github-tools/github - github.js API wrapper

## Timeline resources
- https://platform.github.community/t/get-releases-including-tags/3088/2 - here is nice vertical timeline related to comments date.
- http://visjs.org/index.html#download_install
- http://visjs.org/timeline_examples.html
- http://visjs.org/examples/timeline/other/verticalScroll.html

## Other

- https://dev.twitter.com/rest/reference - Twitter API ?
- https://twitter.jeffprod.com/

## Credits

- Authors of BestOf.JS.Org
- Github API v4 (GraphQL)