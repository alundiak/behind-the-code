export const apiUrl = 'https://bestofjs-api-v2.firebaseapp.com';

/**
 * @param  myData {Array}
 * @return {Promise?}
 */
export function getInfo(myData) {
    //
    // Public BestOfJs API (project.json + hof.json)
    //

    var getProjects = function() {
        const projectsUrl = apiUrl + '/projects.json';
        const projectsJSON = '/data/bestofjs_projects.json';
        const url = window.useUrl ? projectsUrl : projectsJSON;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                return data.projects;
            })
            .catch(error => console.log('error is', error));
    };

    var getHeroes = function() {
        const hofUrl = apiUrl + '/hof.json';
        const hofJSON = '/data/bestofjs_hof.json';
        const url = window.useUrl ? hofUrl : hofJSON;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                return data.heroes;
            })
            .catch(error => console.log('error is', error));
    }

    Promise.all([getProjects(), getHeroes()]).then(values => {
        console.log(values);

        // 965 + 127 (Sep-02-2017)
        // 1542 + 150 (Jun-17-2019)
    });
}
