
var w = 1900;
var h = 900;

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g")

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return (d.galX*2.718)+w/2;
    })
    .attr("cy", function(d) {
        return d.galY+h/2;
    })
    .attr("r", function(d) {
        return d.diameter/1000000;
    })
    .attr("name", function (d) {
        return d.starName;
    })
    .attr("fill", function(d) {
        return d.color;
    })