export const apiUrl = 'https://bestofjs-api-v2.firebaseapp.com';

/**
 * @param  myData {Array}
 * @return {Promise?}
 */
export function getInfo(myData) {
    //
    // Public BestOfJs API (project.json + hof.json)
    //
    var useUrl = false;

    var getProjects = function() {
        let projectsUrl = apiUrl + '/projects.json';
        let projectsJSON = '/data/projects_bestofjs_version.json';
        let url = useUrl ? projectsUrl : projectsJSON;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                return data.projects;
            })
            .catch(error => console.log('error is', error));
    };

    var getHeroes = function() {
        let hofUrl = apiUrl + '/hof.json';
        let hofJSON = '/data/hof_bestofjs_version.json';
        let url = useUrl ? hofUrl : hofJSON;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                return data.heroes;
            })
            .catch(error => console.log('error is', error));
    }

    Promise.all([getProjects(), getHeroes()]).then(values => {
        console.log(values); // 965 + 127 (Sep-02-2017)
    });
}
