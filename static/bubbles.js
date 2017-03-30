(function () {
    "use strict";
    // Use http://www.w3.org/2000/svg for svg elements

    var special = d3.select("slate-special");

    var data = [Math.random() * 100];
    for (let i = 1; i < 9; i += 1) {
	data[i] = data[i - 1] + Math.random() * 100;
    }

    var bubbles = special.selectAll("circle");
    bubbles.data(data);
    bubbles.enter().append(function (d) {
	return document.createElementNS("http://www.w3.org/2000/svg", "circle");
    }).style("r", function (area) {
	return "" + Math.sqrt(d / Math.PI);
    });
}());
