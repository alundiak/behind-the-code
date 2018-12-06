export default function getInfo(TOKEN, myArrayOfRepositories) {
    // let gh = new GitHub(); // unauthenticated client. Can even be used to create a anonymous gist for example

    /*
    // basic auth. The same as unauthenticated, this approach is limited to GET/POST requests per day.
    let gh = new GitHub({
        username: 'alundiak',
        password: 'TBD',
    });
    */

    // But with TOKEN provided no limits.
    let gh = new GitHub({
        token: TOKEN
    });

    myArrayOfRepositories.forEach(function(repository) {
        let ghUserRepo = gh.getRepo(repository.owner, repository.name);
        ghUserRepo.getDetails(function(err, data) {
            console.log(data);
        });
    });
}
