export const apiUrl = 'https://api.github.com';

/**
 * "API rate limit exceeded for 89.64.1.254.
 * (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"

 * @param  TOKEN {String}
 * @param  myData {Array}
 * @return {Promise?}
 */
export function getInfo(TOKEN, myData, renderList) {
    myData.forEach(function(element) {
        // let strUrl = apiUrl + '/repos/' + element.owner + '/' + element.name + `&access_token=${TOKEN}`; // '&access_token=' doesn't work
        const strUrl = apiUrl + '/repos/' + element.owner + '/' + element.name;
        const strJSON = 'data/_' + element.name + '.json';
        const options = {
            headers: {
                // 'Content-Type': 'application/json', // OPTIONS => GET
                // 'Content-Type': 'text/plain', // doesn't matter. Anyway OPTIONS => GET
                'Authorization': `token ${TOKEN}`
            }
        }
        fetch(window.useUrl ? strUrl : strJSON, options)
            .then(response => response.json())
            .then(data => {
                if (renderList) {
                    renderListRowv3(data)
                    $('.loader').hide();
                }
            });
    });
}

export function renderListRowv3(data) {
    var m = {
        fullName: data.full_name,
        name: data.name,
        login: data.owner.login,
        userType: data.owner.type,
        html_url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        watchers: data.watchers_count,
        subscribers: data.subscribers_count,
        created: moment(data.created_at).format('YYYY/MM/DD'),
        updated: moment(data.updated_at).format('YYYY/MM/DD')
    };
    // The closed by native Date is using (new Date(data.created_at)).toLocaleDateString() => 9/3/2017 format

    const str = `<a href="${m.html_url}" target="_blank">${m.name}</a> <span>owned by ${m.login} (${m.userType})
        and has ${m.stars} stars, ${m.subscribers} subscribers, ${m.watchers} watchers, ${m.forks} forks.
        Created ${m.created}, Updated: ${m.updated}</span>`;

    // STARS = WATCHERS => BUG !!! in GitHub API v3
    var span = $('<span class="badge badge-primary badge-pill">').html(m.stars);
    var li = $('<li class="list-group-item d-flex justify-content-between align-items-center">').html(str);
    li.append(span);
    $('.list-group').append(li);
}

export function apiTest1(TOKEN) {
    //
    // https://developer.github.com/v3/
    //

    // GET /user/repos
    // var url = apiUrl + '/user/repos'; // => 401. requires Authentication
    // var url = apiUrl + '/user/repos?type=private';

    // GET /users/:username/repos - // List public repositories for the specified user.
    // var url = apiUrl + '/users/alundiak/repos?type=owner'; // including forks. // (data[].owner.type = 'User')
    // var url = apiUrl + '/users/alundiak/repos?type=member'; // (data[].owner.type = 'User')
    // var url = apiUrl + '/users/facebook/repos'; // (data[].owner.type = 'Organization', but no data[].organization object).
    // var url = apiUrl + '/users/facebook/repos?type=fork'; // (data[].owner.type = 'Organization', but no data[].organization object).

    // GET /orgs/:org/repos - // List repositories for the specified org.
    // var url = apiUrl + '/orgs/mongodb/repos';  // + data[].organization object
    // var url = apiUrl + '/orgs/facebook/repos'; // + data[].organization object
    // alundiak is NOT organization, but facebook or mongodb is user AND organization !!!

    // GET /repositories - // dump of every public repository, in the order that they were created.
    // var url = apiUrl + '/repositories?since=1';

    // GET /repos/:owner/:repo - // info about user's/org's repo.
    // var url = apiUrl + '/repos/facebook/react';

    // GET /repos/:owner/:repo/contributors - // info about user's/org's repo contributors
    // var url = apiUrl + '/repos/facebook/react/contributors';

    // GET /repos/:owner/:repo/teams
    // var url = apiUrl + '/repos/facebook/react/teams';

    // GET /repos/:owner/:repo/tags
    // var url = apiUrl + '/repos/facebook/react/tags';

    // GET /repos/:owner/:repo/commits
    // var url = apiUrl + '/repos/mongodb/mongo/commits';

    // GET /repos/:owner/:repo/commits/:sha - single commit
    // var url = apiUrl + '/repos/facebook/react/commits/3f6e8d28031c85dd3d101e6f259db572d82fe1a1';
    // if I know SHA of of first and last commit... would be great....

    // GET /repos/:owner/:repo/stargazers
    // var url = apiUrl + '/repos/facebook/react/stargazers';
    // GET /user/starred - List repositories being starred by the authenticated user.
    // GET /users/:username/starred - List repositories being starred by a user.

    // GET /notifications
    // var url = apiUrl + '/notifications?page=10&per_page=60&access_token=' + TOKEN;
    // without token => 401
    // with ??access_token="value" => "Requires authentication"
    // If to use "participating=true" => In fact there was 1 notif from
    // https://api.github.com/repos/niklasvh/html2canvas/issues/1115 - I marked as read.
    // GET /repos/:owner/:repo/notifications - List all notifications for the current user.
    // GET /notifications/threads/:id - View a single thread

    // GET /applications/grants
    // var url = apiUrl + '/applications/grants?access_token='+TOKEN;
    // without token => 401
    // with token:
    // "This API can only be accessed with username and password Basic Auth"

    // GET /gists/public
    // var url = apiUrl + '/gists/public';

    // GET /users/:username/gists
    // var url = apiUrl + '/users/alundiak/gists';

    // GET /user/issues
    // var url = apiUrl + '/issues?filter=created&access_token='+TOKEN;
    // var url = apiUrl + '/user/issues';

    // GET /organizations
    var url = apiUrl + '/organizations';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

export function testPerf() {
    //
    // => http://jsben.ch/gBLGu
    //
    // var iterator = repositories.entries();
    // for ... of for iterable objects. Works also with simple arrays/collections, but slower than forEach
    // for (let e of arr) {
    // for (let e of iterator) {
    //  // console.log(e);
    //  console.log(e[1]);
    // }
    // // for...in for enumerable objects. Return indexes.
    //  for (let e in repositories) {
    //  console.log(e);
    // }
}
