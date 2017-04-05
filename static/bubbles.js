window.onload = function () {
    "use strict";
    // Use http://www.w3.org/2000/svg for svg elements

    // To add more demographics, add them to this list and the headers
    // in the table in index.html, in the same order.
    const DEMOGRAPHICS = ["asian", "black", "hispanic", "white", "other"];

    /* Struture of data:
     * [ // array of years
     *    { // data for first year
     *        "nyc": {"asian": <percentage>, "black": <percentage>, ...},
     *        "stuy": ...,
     *        "bronx": ...,
     *        ...
     *    },
     *    { // data for second year
     *        ...
     *    }
     * ]
     */

    // Maximum size of the bubbles (used to scale and position them appropriately)
    const MAX_RADIUS = 50;
    const MAX_AREA = Math.PI * MAX_RADIUS * MAX_RADIUS;

    // Take an <svg> d3 selection, return a .append() of SVG rects to that <svg>.
    let setupRow = function (svg) {
        // The data for each rect is the name of the demographic;
        // when deciding the radius of the rect we look up the percentage
        // that the bubble represents, in our model (data).
        return svg.selectAll("rect").data(DEMOGRAPHICS).enter().append(function (demographic, i) {
            var circ = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            // Place rects with at least enough space to not touch (2 * MAX_RADIUS), plus a 50px margin
            // The final `+ MAX_RADIUS * 1.5` is so that the first rect (i = 0) is not centered at x=0 (which would cut it off)
            circ.setAttribute("x", i * (2.75 * MAX_RADIUS) + MAX_RADIUS * 1.25);
            circ.setAttribute("y", MAX_RADIUS * 1.25);
            circ.setAttribute("width", 5);
            return circ;
        });
    };

    // Params: `rects` is a d3 .append() of <circle>s to an <svg>
    // Updates it with rects of the proper sizes based on the given demographic data
    let updateRow = function (rects, demoData) {
        DEMOGRAPHICS.forEach(function (key) {
            rects.transition().attr("height", function (demo) {
                // Scale area to be within maximum
                let area = demoData[demo] * MAX_AREA;
                return "" + area;
            });
        });
    };

    // To add more categories, just add their SVG elements to this list:
    let svgs = {
        "nyc": d3.select("#slate-nyc"),
        "stuy": d3.select("#slate-stuy"),
        "bxsci": d3.select("#slate-bronx"),
        "bktech": d3.select("#slate-tech"),
        "bklatin": d3.select("#slate-latin"),
        "hsmse": d3.select("#slate-hsmse"),
        "lag": d3.select("#slate-laguardia"),
        "lehman": d3.select("#slate-lehman"),
        "qsci": d3.select("#slate-queens"),
        "sitech": d3.select("#slate-statenIsland")
    };
    const ROW_CATEGORIES = Object.keys(svgs);
    console.log(JSON.stringify(ROW_CATEGORIES));

    let rectControllers = {};
    ROW_CATEGORIES.forEach(function (key) {
        rectControllers[key] = setupRow(svgs[key]);
    });

    let yearSlider = document.getElementById("yearInput");
    let minYr = +yearSlider.getAttribute("min");

    //let years = [];
    // We will use the following to read the data from the document
    let years = JSON.parse(document.getElementById("data-table").getAttribute("data-years"));

    // Put random data in `years`:
    //{
    //    let maxYr = +yearSlider.getAttribute("max");
    //    let randomDemoData = function () {
    //        let demos = {};
    //        DEMOGRAPHICS.forEach(function (key) {
    //            demos[key] = Math.random() * 80;
    //        });
    //        return demos;
    //    };
    //    for (let yearI = 0; minYr + yearI <= maxYr; yearI += 1) {
    //        let yearData = {};
    //        // Make random demographic datasets for each category of row
    //        ROW_CATEGORIES.forEach(function (category) {
    //            yearData[category] = randomDemoData();
    //        });
    //        years.push(yearData);
    //    }
    //}

    // Return the data for the year currently selected by the yearSlider
    let getCurrentYearData = function () {
        return years[+yearSlider.value - minYr];
    };

    // Update every SVG, all at once, based on the data for the current year
    let updateAll = function () {
        ROW_CATEGORIES.forEach(function (category) {
            updateRow(rectControllers[category], getCurrentYearData()[category]);
        });
    };

    updateAll();

    // By default assume the `oninput` event is not supported (as in IE 10) to
    // fall back on `onchange` if `oninput` isn't supported.
    // `oninput` triggers as a user drags the slider, while `onchange` triggers
    // only when the user stops dragging (releases it). Of course `oninput` is preferred.
    let inputEventTriggers = false;

    yearSlider.addEventListener("input", function () {
        inputEventTriggers = true;
        updateAll();
    });
    yearSlider.addEventListener("change", function () {
        if (!inputEventTriggers) {
            updateAll();
        }
    });
};
