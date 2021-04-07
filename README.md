Behind The Code
===

- Visualized timeline of Web Tools, Libraries, Frameworks and people... I know since I started as Web Developer (2007).
- GraphQL + GitHub API case study

[![Netlify Status](https://api.netlify.com/api/v1/badges/5eb8fbfe-12b7-4ab4-822f-32a9dd248035/deploy-status)](https://app.netlify.com/sites/keen-shaw-ff3e2c/deploys)
[![TravisCI Build Status](https://travis-ci.org/alundiak/behind-the-code.svg?branch=master)](https://travis-ci.org/alundiak/behind-the-code)
[![CircleCI Build Status](https://circleci.com/gh/alundiak/behind-the-code.svg?style=svg)](https://circleci.com/gh/alundiak/behind-the-code)
[![Coverage Status](https://coveralls.io/repos/github/alundiak/behind-the-code/badge.svg)](https://coveralls.io/github/alundiak/behind-the-code)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Goal #1 - List of GitHub repositories
- Create (static) web page to represent main information about trending frontned tools.
- Represent next entities: repo owner, first commit date ("since" date), last commit date ("update/pushed" date).


## Tech details
- ES6 modules (export/import), since Chrome 60 (w/ flag), since 61 released. And in NodeJS since `v8.5.0` with flag `--experimental-modules`
- ES6 async function and Fetch API.
- ES6 String/Template literals
- [bestof.js.org](https://bestof.js.org) Public JSONs.
- [GitHub Public API v3](https://developer.github.com/v3/) (REST).
- [github-api](https://github.com/github-tools/github) - API v3 wrapper.
- [GitHub Public API v4](https://developer.github.com/v4/) ([GraphQL](http://graphql.org)).


## Design
- Use vertical layout to show timeline from ~1990 till now.
- Maybe visualize it using vertical timeline like on https://platform.github.community page.
- Maybe use `<progress>` html tag.


## Browser Support
- ES Modules (export/import): Chrome 61+ (Canary), -Chrome 60, +Chrome 61, -Firefox 55, Safari+.
- Fetch API: Chrome+, Firefox+, Safari+, Opera+, Edge+, IE11-
- HTML Imports: Chrome+, Opera+, Firefox-, IE11-, Edge-
- Template Literals: Chrome+, Firefox+, Safari+, Opera+, IE11-, Edge+
- Async functions: Chrome+, Firefox+, Safari+, Opera+, IE11-, Edge+
- Performance API, Navigation Timing API - looks like supported by all major browsers.
- URLSearchParams API since Chrome 49+, Opera 36+, FireFox 44+.

## Notes / Conclusions / Lessons Learned
- HTML imports works, but JS files are loaded later, than simple HTML inside inside of main index.html file. Sometimes MomentJS is not yet available.
- Preflighted Requests. When `options.headers` provided for Fetch API it does send OPTIONS and then POST request. Simple XmlHttpRequest goes only one POST.
- GraphQL is the winner for sure. Using simple Fetch calls to GitHub API v3 is ok, but to much request. And using github-api with Requestable is the slowest.
- 2019: Twitter Bootstrap `v4.0.0-beta` is not stable enough - there are at least UI issues with list-group. Sep-05-2017 they dropped bower support. npm module `bootstrap` is ok (contains js, css and scss). But there is also unverified `bootstrap-css` which contains css files but also scss file pointing to `../node_modules/bootstrap/scss` folder. Odd. 2020 - not relevant anymore.
- HTML `<template>` still not supported by IE and partially supported by Edge. Chrome+, Firefox+.


## `*.idl` (`*.graphql`) file extensions.
- How to read `*.idl` files
- and if possible how to use contentType `application/graphql`
    - https://graphql.org/learn/serving-over-http/
- https://github.com/Shopify/graphql-js-client-compiler
- https://github.com/apollographql/graphql-syntax
- Work more with schema and types.
- Auth0 vs OAuth?


## Resources

### Base Technologies
- https://css-tricks.com/using-fetch/
- https://blog.patricktriest.com/what-is-async-await-why-should-you-care/
- https://www.html5rocks.com/en/tutorials/webcomponents/template/
- http://blog.teamtreehouse.com/creating-reusable-markup-with-the-html-template-element
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
- https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

### GitHub API, GraphQL
- https://www.digitalocean.com/community/questions/what-is-the-difference-between-an-api-token-and-a-personal-token
- https://github.com/RisingStack/risingstack-bootcamp
- https://githubengineering.com/the-github-graphql-api/ (since Sep-2016)
- http://graphql.org/learn/serving-over-http/
- https://github.com/graphql/express-graphql/issues/14 - Express GraphQL and CORS discussion

### Twitter Bootstrap
- https://github.com/twbs/bootstrap/issues/23557
- https://github.com/twbs/bootstrap/pull/23614 - @wrakky/bootstrap suggestion

### Resource Loading, Pre-loading, progress bar
- https://css-tricks.com/css3-progress-bars/ - HTML5 `<progress>`, `<meter>`
- https://www.freshdesignweb.com/jquery-css3-loading-progress-bar/
- https://developers.google.com/web/tools/chrome-devtools/network-performance/resource-loading
- http://blog.trasatti.it/2012/12/measuring-the-speed-of-resource-loading-with-javascript-and-html5.html
- https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content + http://caniuse.com/#search=preload
- https://davidwalsh.name/measuring-performance
- https://www.sitepoint.com/introduction-resource-timing-api/

### Timeline feature
- https://platform.github.community/t/get-releases-including-tags/3088/2 - here is nice vertical timeline related to comments date.
- http://visjs.org/index.html#download_install
- http://visjs.org/timeline_examples.html
- http://visjs.org/examples/timeline/other/verticalScroll.html
- new Vis - https://github.com/visjs/vis-timeline
- https://visjs.github.io/vis-timeline/examples/timeline/

### Timeline feature (ReactJS)
- https://github.com/uber/react-vis
- https://github.com/Lighthouse-io/react-visjs-timeline (maybe)

### OAuth and GitHub OAuth Apps
- https://gist.github.com/technoweenie/419219 - GitHub OAuth Busy Developer's Guide (based on GitHi API v2)
- https://github.com/atmos/warden-github - some kind of extension on Ruby.
- https://github.com/atmos/sinatra_auth_github - some kind of extension on Ruby.
- https://github.com/scottgonzalez/connect-oauth-github - looks like 2013, old and not maintained.
- https://stormpath.com/blog/what-the-heck-is-oauth
- https://insomnia.rest/blog/oauth2-github-api/
- https://api.slack.com/docs/oauth-safety
- https://firebase.google.com/docs/auth/web/github-auth

### Auth0
- https://auth0.com/docs/connections/social/github
- https://manage.auth0.com
- https://github.com/auth0/auth0.js

### Auth0 vs OAuth
- https://auth0.com/docs/protocols/oauth2
- https://auth0.com/blog/everything-you-wanted-to-know-about-oauth-2-but-were-too-afraid-to-ask/ - nice video. Used passport-github
- https://stackshare.io/stackups/auth0-vs-oauth-io
- https://developer.telerik.com/featured/oauth-has-ruined-everything/
- https://www.npmjs.com/package/client-oauth2

### GitHub API v3 wrappers

github-tools aka `github-api`
- https://github.com/github-tools/github/ (v3-based)
- https://github.com/github-tools/github/issues/392#issuecomment-328295155 - Discussion about errors with importing github-api
- https://github.com/github-tools/github/issues/564 - DEPRECATION EOY 2019

node-github aka `@octokit/rest`
- https://github.com/mikedeboer/node-github - node library to access the GitHub API (v3-based)
- https://github.com/octokit/rest.js


GitHub + GraphQL + React
- https://medium.com/@katopz/github-graphql-api-react-example-eace824d7b61 [2016, deps outdated]

???
- https://www.npmjs.com/package/client-oauth2 (https://github.com/mulesoft/js-client-oauth2) - Generic library for OAuth client connections.
- https://github.com/jaredhanson/passport-github - looks like 3rd approach to connect GitHub
- https://www.npmjs.com/package/passport-github2 - fork
- http://passportjs.org/ by @jaredhanson


## Credits / Thanks to
- Authors of BestOf.JS.Org
- Authors of [github-api](https://github.com/github-tools/github) repo.
- Github API v4 (GraphQL)
- https://platform.github.community
- https://github.com/mraible/history-of-web-frameworks-timeline

## TODO
- Implement scroll by scrollbar, instead of scroll wheel.
- Add search of repos or list of repos below timeline, with ability to slick and locate it on timeline.
    - Maybe somehow using Fuse.JS https://github.com/krisk/fuse
- Rewrite server in HTTP/2 manner
- https://npmaddict.com/ ?