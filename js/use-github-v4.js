/* eslint-disable no-tabs */

export const apiUrl = 'https://api.github.com/graphql';

/**
 * @param  myData {Array}
 * @param  TOKEN {String}
 * @return {Promise?}
 */
export function getInfo(myData, TOKEN) {
    // First token was generated on GitHub settings page, Sep-02-2017, for mostly read-only access. 
    // I added it to js file content, and committed to repo.
    // Then I received email, about warning, that it's not ok.
    // So I regenerated token, and this time, put it into local, but hidden/ignored file 'token.json'
    // And when I need to use GitHub API v4, I use GET to fetch the token. Not yet sure if it's also incorrect from GitHub pov.

    myData.forEach(function(element){
		getRepositoryInfoByOwnerAndName(TOKEN, element.owner, element.repo)
			.then(data => {
				console.log(data);
				renderList(data);
			});
    });

}

export function testApi(TOKEN) {

	// Test 1
	// getRepositoryInfoByOwnerAndName(TOKEN, 'facebook','react');
	getRepositoryInfoByOwnerAndName(TOKEN, 'vuejs','vue')
		.then(data => {
				console.log(data);
		});

	// Test 2

}

function renderList(data) {
    let str = `${data.name} owned by ${data.owner.login} (${data.owner.__typename}) 
        and has ${data.stars} stars, ${data.subscribers} subscribers, ${data.watchers} watchers, ${data.forks} forks. 
        Created ${moment(data.createdAt).format('YYYY/MM/DD')}, Updated: ${moment(data.updatedAt).format('YYYY/MM/DD')}`;

    var span = $('<span class="badge badge-primary badge-pill">').html(data.stars);
    var li = $('<li class="list-group-item d-flex justify-content-between align-items-center">').html(str);
    li.append(span);
    $('.list-group').append(li);
}

function getRepositoryInfoByOwnerAndName(TOKEN, owner, name){
	let queryBody1 = `{
		repository(owner: "${owner}", name: "${name}") {
			name
			nameWithOwner
			description
			createdAt
			updatedAt
			isFork
		}
	}`;

    return performRequest(TOKEN, queryBody1).then(data => {
        // console.log(data.repository);
        return data.repository;
    })
}

function prepareGraphqlOptions(queryBody) {
	if (!queryBody){
		return;
	}

    let queryObject = {
        query: queryBody
    };

    // console.log(queryBody, queryObject, JSON.stringify(queryObject));
    return {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryObject)
    };
}

function performRequest(TOKEN, queryBody){
	let graphqlOptions = prepareGraphqlOptions(queryBody);
	if (!graphqlOptions){
		return;
	}
	// console.log(graphqlOptions);
	return fetch(apiUrl + '?access_token=' + TOKEN, graphqlOptions)
        .then(response => response.json())
        .then(data => {
        	console.log(data);
        	return data.data;
        });
}

// no semicolon at the end!  if default
// Note that it is not possible to use var, let or const with export default.
