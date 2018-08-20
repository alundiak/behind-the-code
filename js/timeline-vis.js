//
// Horizontal Scrollable, Collapsible Timeline with HTML content/images support
// http://visjs.org/timeline_examples.html
// http://visjs.org/examples/timeline/items/htmlContents.html
// 

export function attachExamples() {
    var item1 = document.createElement('div');
    item1.appendChild(document.createTextNode('item 1'));

    var item2 = document.createElement('div');
    item2.innerHTML = '<span>item 2</span>';

    var item3 = document.createElement('div');
    var span3 = document.createElement('span');
    span3.className = 'large';
    span3.appendChild(document.createTextNode('item 3'));
    item3.appendChild(span3);

    var item4 = 'item <span class="large">4</span>';

    var item5 = document.createElement('div');
    item5.appendChild(document.createTextNode('item 5'));
    item5.appendChild(document.createElement('br'));
    var img5 = document.createElement('img');
    img5.src = '../img/attachment-icon.png';
    img5.style.width = '48px';
    img5.style.height = '48px';
    item5.appendChild(img5);

    // var item6 = '<a href="http://visjs.org" target="_blank"><img src="../img/comments-icon.png" style="width: 48px; height: 48px;" title="VisJS"></a>';

    var item6 = document.createElement('div');
    var img6 = document.createElement('img');
    img6.src = '../img/attachment-icon.png';
    img6.style.width = '32px';
    img6.style.height = '32px';
    img6.title = 'VisJS';
    var a6 = document.createElement('a');
    a6.href = 'http://google.com';
    a6.target = '_blank';
    a6.appendChild(img6);
    item6.appendChild(a6);

    var item7 = '<a href="http://visjs.org" target="_blank">VisJS</a>';

    // create data and a Timeline
    var container = document.getElementById('visualization');
    var items = new vis.DataSet([{
        id: 1,
        content: item1,
        start: '2013-04-20'
    }, {
        id: 2,
        content: item2,
        start: '2013-04-14'
    }, {
        id: 3,
        content: item3,
        start: '2013-04-18'
    }, {
        id: 4,
        content: item4,
        start: '2013-04-16',
        end: '2013-04-19'
    }, {
        id: 5,
        content: item5,
        start: '2013-04-25'
    }, {
        id: 6,
        content: item6,
        start: '2013-04-27'
    }, {
        id: 7,
        content: item7,
        start: '2013-04-21'
    }]);
    var options = {};
    var options = {
        // sampling: true,
        // drawPoints: {enabled:false, size:3},
        // interpolation: false,
        height: '100px',
        // maxHeight: 100,
        start: 2000,
        end: 2018
    };
    var timeline = new vis.Timeline(container, items, options);
}


/**
 * [renderTimeLineViz description]
 * @param  {[HtmlDivElement]} container - root element where timeline will be attached
 * @param  {[Array]} reposDataArray    - converted data from GraphQL in Array format
 * @param  {[Object]} options    - options object to customize Timeline
 * @return void
 */
export function renderTimeLineViz(container, reposDataArray, options) {
    var prepareContentHTML = function(d) {
        // https://octicons.github.com/
        // Maybe use GitHub star svg and stargazer number to show somehow
        let tmpl = `<a href="${d.url}" target="_blank"><img class="avatar" src="${d.owner.avatarUrl}" title="${d.name}\n${d.description}\nCreated: ${moment(d.createdAt).format('YYYY/MM/DD')}"></a>`;
        return tmpl;
    }

    // {
    //     id: 1,
    //     content: itemHtml, // itemHtmlObject
    //     start: '2013/12/30'
    // }
    var buildTimelineEntityData = function(data) {
        let dataArr = [];
        data.forEach(function(repoRecord, index, arr) {
            let obj = {
                id: index,
                content: prepareContentHTML(repoRecord),
                start: moment(repoRecord.createdAt).format('YYYY/MM/DD')
            };
            dataArr.push(obj);
        })
        return dataArr;
    }

    let timelineDataSet = buildTimelineEntityData(reposDataArray);

    const items = new vis.DataSet(timelineDataSet);

    let timeline = new vis.Timeline(container, items, options || {});

    // But still page loaded later !!! TODO
    $('.loader').hide();
}
