(function () {
    "use strict";
    // Use http://www.w3.org/2000/svg for svg elements

    var special = d3.select("#slate-special");

    var data = [Math.random() * 100];
    for (let i = 1; i < 9; i += 1) {
	data[i] = data[i - 1] + Math.random() * 100;
    }

    console.log(data);

    var bubbles = special.selectAll("circle").data(data);
    bubbles.enter().append(function (d, i) {
	var circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circ.setAttribute("cx", i * 50 + 25);
	circ.setAttribute("cy", 50);
	return circ;
    }).attr("r", function (area) {
	return "" + Math.sqrt(area / Math.PI);
    });
}());
