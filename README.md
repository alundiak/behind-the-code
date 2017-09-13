Behind The Code
===
My Web Notes [2007-2017] about tools, libraries, frameworks and people...

## Goal #1 - List of GitHub repositories

- Create (static) web page with content, like I've done for UI2HR.pptx for GL.
- Represent next entities: repo owner, first commit date ("since" date), last commit date ("update/pushed" date).
- Maybe visualize it vi vertical timeline on scroll.


## Tech details

- ES6 modules (export/import), since Chrome 60 (w/ flag), since 61 released.
- ES6 async function and Fetch API.
- ES6 String/Template literals
- [bestof.js.org](https://bestof.js.org) Public JSONs.
- [GitHub Public API v3](https://developer.github.com/v3/) (REST).
- [github-api](https://github.com/github-tools/github) - API v3 wrapper.
- [GitHub Public API v4](https://developer.github.com/v4/) ([GraphQL](http://graphql.org)).


## Design

- Use vertical layout to show timeline from ~1990 till now.


## Browser Support

- Modularization (export/import): Chrome 61+ (Canary), -Chrome 60, -Firefox
- Fetch API: Chrome+, Firefox+, Safari+, Opera+, Edge+, IE11-
- HTML Imports: Chrome+, Opera, Firefox-, IE11-, Edge-
- Template Literals: Chrome+, Firefox+, Safari+, Opera+, -IE11, Edge+
- Async functions: Chrome+, Firefox+, Safari+, Opera+, -IE11, Edge+
- Performance API, Navigation Timing API - looks like supported by all major browsers.

## Notes / Conclusions / Lessons Learned

- HTML imports works, but JS files are loaded later, than simple HTML inside inside of main index.html file. Sometimes MomentJS is not yet available.
- Fetch API doesn't work the same as XHR.
- GraphQL is the winner for sure. Using simple Fetch calls to GitHu API v3 is ok, but to much request. And using github-api with Requestable is the slowest.
- Twitter Bootstrap v4.0.0-beta is not stable enough. Sep-05-2017 they dropped being bower component. And now we have 2 node modules: bootstrap which contains js css and scss and bootstrap-css which contains css files but also scss file pointing to `../node_modules/bootstrap/scss` folder. Odd. What if custom user will change folder?
- https://github.com/twbs/bootstrap/issues/23557
- https://github.com/twbs/bootstrap/pull/23614 - @wrakky/bootstrap suggestion
- HTML5 `<progress>`, `<meter>` => https://css-tricks.com/css3-progress-bars/
- https://www.freshdesignweb.com/jquery-css3-loading-progress-bar/
- https://developers.google.com/web/tools/chrome-devtools/network-performance/resource-loading
- http://blog.trasatti.it/2012/12/measuring-the-speed-of-resource-loading-with-javascript-and-html5.html
- https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content + http://caniuse.com/#search=preload

## Resources

- https://css-tricks.com/using-fetch/
- https://github.com/RisingStack/risingstack-bootcamp
- https://githubengineering.com/the-github-graphql-api/ (since Sep-2016)
- https://www.digitalocean.com/community/questions/what-is-the-difference-between-an-api-token-and-a-personal-token
- http://graphql.org/learn/serving-over-http/
- https://github.com/graphql/express-graphql/issues/14 - Express GraphQL and CORS discussion
- https://github.com/github-tools/github/issues/392#issuecomment-328295155 - Discussion about errors with importing github-api


## Timeline resources
- https://platform.github.community/t/get-releases-including-tags/3088/2 - here is nice vertical timeline related to comments date.
- http://visjs.org/index.html#download_install
- http://visjs.org/timeline_examples.html
- http://visjs.org/examples/timeline/other/verticalScroll.html


## Credits / Thanks to

- Authors of BestOf.JS.Org
- Authors of [github-api](https://github.com/github-tools/github) repo.
- Github API v4 (GraphQL)
- https://platform.github.community