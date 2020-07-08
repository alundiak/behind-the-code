export const apiUrl = 'https://bestofjs-api-v2.firebaseapp.com';

const getProjects = async function () {
    const projectsUrl = apiUrl + '/projects.json';
    const projectsJSON = '/logs/bestofjs_projects.json';
    const url = window.useUrl ? projectsUrl : projectsJSON;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.projects;
    }
    catch (error) {
        return console.log('error is', error);
    }
};

const getHeroes = async function () {
    const hofUrl = apiUrl + '/hof.json';
    const hofJSON = '/logs/bestofjs_hof.json';
    const url = window.useUrl ? hofUrl : hofJSON;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.heroes;
    }
    catch (error) {
        return console.log('error is', error);
    }
}

/**
 * @todo - try to reuse this API for some pop-up news about latest github projects. Can be via toasted messages.
 * @return {Promise?}
 */
export function getInfo() {
    //
    // Public BestOfJs API (project.json + hof.json)
    //

    Promise.all([getProjects(), getHeroes()]).then(values => {
        console.log('LOOK to NETWORK for more info');
        console.log(values);
        // 965 + 127 (Sep-02-2017)
        // 1542 + 150 (Jun-17-2019)
        // 1550 + 150 (Jul-07-2020)
    });
}
