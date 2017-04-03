window.onload = function () {
    "use strict";
    // Use http://www.w3.org/2000/svg for svg elements

    let special = d3.select("#slate-special");

    let data = [];
    for (let yearI = 0; yearI < 100; yearI += 1) {
	let yearData = [Math.random() * 100];
	for (let i = 1; i < 9; i += 1) {
	    yearData[i] = yearData[i - 1] + Math.random() * 100;
	}
	data.push(yearData);
    }

    let slider = document.getElementById("yearInput");

    let currentYearIndex = function () {
	return +slider.value - (+slider.getAttribute("min"));
    };

    let circData = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let bubbles = special.selectAll("circle").data(circData);
    let circles = bubbles.enter().append(function (schoolIndex) {
	var circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circ.setAttribute("cx", schoolIndex * 50 + 25);
	circ.setAttribute("cy", 50);
	return circ;
    });

    let updateCircles = function () {
	circles.transition().attr("r", function (schoolIndex) {
	    let yr = data[currentYearIndex()];
	    return "" + Math.sqrt(yr[schoolIndex] / Math.PI);
	});
    };

    updateCircles();

    slider.addEventListener("input", function () {
	updateCircles();
    });
};
