Behind The Code
===
My Web Notes [2007-2017] about tools, libraries, frameworks and people...

## Goal #1

- Create (static) web page with content, like I've done for UI2HR.pptx for GL.
- Represent next entities: repo owner, first commit date ("since" date), last commit date ("update/pushed" date).
- Maybe visualize it vi vertical timeline on scroll.


## Tech details

- ES6 modules (export/import), since Chrome 60 (w/ flag), since 61 released.
- ES6 async function and Fetch API.
- ES6 String/Template literals
- GitHub Public API v3 (REST) + https://github.com/github-tools/github
- GitHub Public API v4 (GraphQL).
- bestof.js.org Public JSONs.

## Design

- Use vertical layout to show timeline from ~1990 till now.


## Browser Support

- Modularization (export/import): Chrome 61+ (Canary), -Chrome 60, -Firefox
- Fetch API: Chrome+, Firefox+, Safari+, Opera+, Edge+, IE11-
- HTML Imports: Chrome+, Opera, Firefox-, IE11-, Edge-
- Template Literals: Chrome+, Firefox+, Safari+, Opera+, -IE11, Edge+
- Async functions: Chrome+, Firefox+, Safari+, Opera+, -IE11, Edge+

## Notes / Conclusions / Lessons Learned

- HTML imports works, but JS files are loaded later, than simple HTML inside inside of main index.html file. Sometimes MomentJS is not yet available.
- 

## Resources

- https://css-tricks.com/using-fetch/
- https://developer.github.com/v3/ - GitHub Rest API v3
- https://developer.github.com/v4/ - GraphQL API v4
- https://github.com/RisingStack/risingstack-bootcamp
- https://githubengineering.com/the-github-graphql-api/ (since Sep-2016)
- https://bestof.js.org
- https://www.digitalocean.com/community/questions/what-is-the-difference-between-an-api-token-and-a-personal-token
- https://github.com/github-tools/github - github.js API wrapper (looks like v3 API)
- http://graphql.org/learn/serving-over-http/ - content-type graphql
- Express GraphQL and CORS https://github.com/graphql/express-graphql/issues/14


## Timeline resources
- https://platform.github.community/t/get-releases-including-tags/3088/2 - here is nice vertical timeline related to comments date.
- http://visjs.org/index.html#download_install
- http://visjs.org/timeline_examples.html
- http://visjs.org/examples/timeline/other/verticalScroll.html


## Credits / Thanks to

- Authors of BestOf.JS.Org
- Github API v4 (GraphQL)
- https://platform.github.community