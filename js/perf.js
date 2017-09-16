//
// http://blog.trasatti.it/2012/12/measuring-the-speed-of-resource-loading-with-javascript-and-html5.html
// https://github.com/atrasatti/jsperfexamples
// :) 2012 year, #omg, I never tried that
// 
// export default function() {

// simplePerf();
// testPerf1();

// loadResTimData();    
// var perfData = loadResTimData();
// $('.perf-data').html(perfData);
// }

function simplePerf() {
    var pe = performance.getEntries();
    for (var i = 0; i < pe.length; i++) {
        if (window.console) {
            console.log("Name: " + pe[i].name +
                " Start Time: " + pe[i].startTime +
                " Duration: " + pe[i].duration + "\n");
        }
    }
}

function testPerf1() {
    var perfData = window.performance.timing;
    var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(pageLoadTime);

    var connectTime = perfData.responseEnd - perfData.requestStart;
    console.log(connectTime);

    var renderTime = perfData.domComplete - perfData.domLoading;
    console.log(renderTime);
}

function loadResTimData() {
    var e = window.performance.getEntries();
    var perf_data = `<table id='table_perf_data'><thead><tr><td>Resource</td><td>Network (ms)</td>
        <td>Request (ms)</td><td>Response (ms)</td></tr></thead>\n<tbody>\n`;
    var t = [];
    for (var i in e) {
        if (e[i].name == "document") {
            // for the document refer to window.performance.timing instead, we skip it for this example
            continue;
        }
        perf_data = perf_data + "<tr><td>" + e[i].name.replace(/^.*\/|\.$/g, '') + "</td>";
        if (e[i].requestStart == 0) {
            // resource is cached, some entries are zero, we default to fetchStart instead
            perf_data = perf_data + "<td>" + Math.round(e[i].fetchStart - e[i].startTime) + "</td>";
        } else {
            perf_data = perf_data + "<td>" + Math.round(e[i].requestStart - e[i].startTime) + "</td>";
        }
        perf_data = perf_data + "<td>" + Math.round(e[i].responseStart - e[i].requestStart) + "</td>";
        perf_data = perf_data + "<td>" + Math.round(e[i].responseEnd - e[i].responseStart) + "</td>";
        perf_data = perf_data + "</tr>\n";
    }
    perf_data = perf_data + "</tbody>\n</table>\n";
    return perf_data;
}

//
// https://w3c.github.io/perf-timing-primer/
//
function loadResources() {
    // console.log('loadResources');
    var image1 = new Image();
    image1.onload = resourceTiming;
    image1.src = 'https://www.w3.org/Icons/w3c_main.png';
}

function resourceTiming() {
    var resourceList = window.performance.getEntriesByType("resource");
    console.log(resourceList);
    for (var i = 0; i < resourceList.length; i++) {
        if (resourceList[i].initiatorType == "img") {
            console.log("End to end (img) resource fetch: " + (resourceList[i].responseEnd - resourceList[i].startTime));
        }
    }
}

//
// User Timing example
// https://w3c.github.io/perf-timing-primer/#user-timing
//
function init() {
    performance.mark("startTask1");
    // doTask1(); // Some developer code
    performance.mark("endTask1");

    performance.mark("startTask2");
    // doTask2(); // Some developer code
    performance.mark("endTask2");

    measurePerf();
}

function measurePerf() {
    var perfEntries = performance.getEntriesByType("mark");
    for (var i = 0; i < perfEntries.length; i++) {
        if (window.console) {
            console.log("Name: " + perfEntries[i].name +
                " Entry Type: " + perfEntries[i].entryType +
                " Start Time: " + perfEntries[i].startTime +
                " Duration: " + perfEntries[i].duration + "\n");
        }
    }
}

//
// https://www.sitepoint.com/profiling-page-loads-with-the-navigation-timing-api/
// again 2012 year, why performance was discussed at that only time?
//
window.addEventListener("load", function() { // TODO
    // console.log('load event');
    setTimeout(function() {
        var timing = window.performance.timing;
        var userTime = timing.loadEventEnd - timing.navigationStart;
        var dns = timing.domainLookupEnd - timing.domainLookupStart;
        var connection = timing.connectEnd - timing.connectStart;
        var requestTime = timing.responseEnd - timing.requestStart;
        var fetchTime = timing.responseEnd - timing.fetchStart;

        // use timing data
        // console.log(timing, userTime, dns, connection, requestTime, fetchTime);
    }, 0);
}, false);
