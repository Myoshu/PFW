/**
 * Created by Marta on 30/07/2016.
 */
var w = 1900,
    h = 900;

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append("g");

 var circle = svg.selectAll("circle")
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
     .call(function(d) {
         var cx = d[0][0].cx.animVal.value;
         var cy = d[0][0].cy.animVal.value;
         d.transition()
             .duration(100000)
             .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(" + 100 + ")translate(" + -cx + "," + -cy + ")");
     })