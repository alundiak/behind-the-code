//
// http://blog.trasatti.it/2012/12/measuring-the-speed-of-resource-loading-with-javascript-and-html5.html
// https://github.com/atrasatti/jsperfexamples
// :) 2012 year, #omg, I never tried that
// 
export default function() {

    // simplePerf();
    // testPerf1();

    // loadResTimData();	
    // var perfData = loadResTimData();
    // $('.perf-data').html(perfData);
}

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
    // console.log(moment(pageLoadTime).format('YYYY/MM/DD'));

    var connectTime = perfData.responseEnd - perfData.requestStart;
    console.log(connectTime);

    var renderTime = perfData.domComplete - perfData.domLoading;
    console.log(renderTime);
}

function loadResTimData() {
    var e = window.performance.getEntries();
    var perf_data = "<table id='table_perf_data'><thead><tr><td>Resource</td><td>Network (ms)</td><td>Request (ms)</td><td>Response (ms)</td></tr></thead>\n<tbody>\n";
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
