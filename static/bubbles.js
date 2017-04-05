window.onload = function () {
    "use strict";
    // Use http://www.w3.org/2000/svg for svg elements

    // To add more demographics, add them to this list and the headers
    // in the table in index.html, in the same order.
    const DEMOGRAPHICS = ["asian", "black", "hispanic", "white", "foreign", "other"];

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

    const MAX_RADIUS = 50;
    const MAX_AREA = Math.PI * MAX_RADIUS * MAX_RADIUS;

    // Take an <svg> d3 selection, return a .append() of SVG circles to that <svg>.
    let setupRow = function (svg) {
        // The data for each circle is the name of the demographic;
        // when deciding the radius of the circle we look up the percentage
        // that the bubble represents, in our model (data).
        return svg.selectAll("circle").data(DEMOGRAPHICS).enter().append(function (demographic, i) {
            var circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            // Place circles with at least enough space to not touch (2 * MAX_RADIUS), plus a 50px margin
            // The final `+ MAX_RADIUS * 1.5` is so that the first circle (i = 0) is not centered at x=0 (which would cut it off)
            circ.setAttribute("cx", i * (2.75 * MAX_RADIUS) + MAX_RADIUS * 1.25);
            circ.setAttribute("cy", MAX_RADIUS * 1.25);
            return circ;
        });
    };

    // Params: `circles` is a d3 .append() of <circle>s to an <svg>
    // Updates it with circles of the proper sizes based on the given demographic data
    let updateRow = function (circles, demoData) {
        DEMOGRAPHICS.forEach(function (key) {
            circles.transition().attr("r", function (demo) {
                // Scale area to be within maximum
                let area = demoData[demo] / 100 * MAX_AREA;
                console.log(area);
                return "" + Math.sqrt(area / Math.PI);
            });
        });
    };

    // To add more categories, just add their SVG elements to this list:
    let svgs = {
        "nyc": d3.select("#slate-nyc"),
        "stuy": d3.select("#slate-stuy"),
        "bronx": d3.select("#slate-bronx"),
        "tech": d3.select("#slate-tech"),
        "latin": d3.select("#slate-latin"),
        "hsmse": d3.select("#slate-hsmse"),
        "laguardia": d3.select("#slate-laguardia"),
        "lehman": d3.select("#slate-lehman"),
        "queens": d3.select("#slate-queens"),
        "statenIsland": d3.select("#slate-statenIsland")
    };
    const ROW_CATEGORIES = Object.keys(svgs);

    let circleControllers = {};
    ROW_CATEGORIES.forEach(function (key) {
        circleControllers[key] = setupRow(svgs[key]);
    });

    let yearSlider = document.getElementById("yearInput");
    let minYr = +yearSlider.getAttribute("min");

    // Generate random data:
    let years = (function () {
        let maxYr = +yearSlider.getAttribute("max");
        let result = [];
        let randomDemoData = function () {
            let demos = {};
            DEMOGRAPHICS.forEach(function (key) {
                demos[key] = Math.random() * 80;
            });
            return demos;
        };
        for (let yearI = 0; yearI < maxYr - minYr; yearI += 1) {
            let yearData = {};
            // Make random demographic datasets for each category of row
            ROW_CATEGORIES.forEach(function (category) {
                yearData[category] = randomDemoData();
            });
            result.push(yearData);
        }
        return result;
    }());

    let getCurrentYearRows = function () {
        return years[+yearSlider.value - minYr];
    };

    let updateAll = function () {
        ROW_CATEGORIES.forEach(function (category) {
            updateRow(circleControllers[category], getCurrentYearRows()[category]);
        });
    };

    updateAll();

    // By default assume "input" event is not handled (as in IE 10).
    // `oninput` triggers as sliders slides, while `onchange` triggers
    // only when the yearSlider stops, so `oninput` is preferred.
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
