
var w = 1900;
var h = 900;

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return d.galX+w/2;
    })
    .attr("cy", function(d) {
        return d.galY+h/2;
    })
    .attr("r", function(d) {
        return d.dist/100;
    })
    .attr("fill", function(d) {
        return d.color;
    })