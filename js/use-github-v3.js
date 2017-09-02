export const apiUrl = 'https://api.github.com';

export function testApi() {
    // 
    // https://developer.github.com/v3/
    //

    // GET /user/repos
    var url = apiUrl + '/user/repos';

    // GET /users/:username/repos - // List public repositories for the specified user.
    // var url = apiUrl + '/users/alundiak/repos'; // (data[].owner.type = 'User')
    // var url = apiUrl + '/users/facebook/repos'; // (data[].owner.type = 'Organization', but no data[].organization object).

    // GET /orgs/:org/repos - // List repositories for the specified org.    
    // var url = apiUrl + '/orgs/mongodb/repos';  // + data[].organization object
    // var url = apiUrl + '/orgs/facebook/repos'; // + data[].organization object 

    // alundiak is NOT organization, but facebook or mongodb is user AND organization !!!

    // GET /repositories
    // var url = apiUrl + 'repositories?since=1'; // dump of every public repository, in the order that they were created. 

    // GET /repos/:owner/:repo - // info about user's repo?
    // var url = apiUrl + '/repos/facebook/react'; 

    // GET /repos/:owner/:repo/contributors - // info about user's repo contributors
    // var url = apiUrl + '/repos/facebook/react/contributors';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

export function getInfo(myData) {
    var urls = [];
    myData.forEach(function(element, index, arr) {
        let str = apiUrl + '/repos/' + element.owner + '/' + element.repo;
        urls.push(str);
    });

    console.log(urls);

    return fetch(urls[1])
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log('ID?: ' + data.id);
            console.log('Created: ' + data.created_at);
            console.log('Updated: ' + data.updated_at);
            console.log('Fork?: ' + data.fork);
            console.log('stargazers_count?: ' + data.stargazers_count);
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
