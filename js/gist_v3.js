const apiUrl = 'https://api.github.com';

export default function getInfo(TOKEN, myArrayOfRepositories) {
    myArrayOfRepositories.forEach(function(repository) {
        let strUrl = apiUrl + '/repos/' + repository.owner + '/' + repository.name;
        let options = {
            headers: {
                // 'Content-Type': 'application/json', // OPTIONS => GET
                // 'Content-Type': 'text/plain', // doesn't matter. Anyway OPTIONS => GET
                'Authorization': `token ${TOKEN}`
            }
        }
        fetch(strUrl, options)
            .then(response => response.json())
            .then(data => console.log(data));
    });
}
