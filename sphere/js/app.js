var w = 1920,
    h = 1080,
    rotate = [1, -1],
    velocity = [.003, -.001],
    time = Date.now();

var projection = d3.geo.orthographic()
    .scale(240)
    .translate([w / 2, h / 2])
    .clipAngle(90 + 1e-6)
    .precision(.3);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g");

var circle = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return (d.galX*20)+w/2;
    })
    .attr("cy", function(d) {
        return d.galY+h/2;
    })
    .attr("r", function(d) {
        return d.diameter/100000;
    })
    .attr("name", function (d) {
        return d.starName;
    })
    .attr("fill", function(d) {
        return d.color;
    })


circle.append("path")
    .datum({type: "Sphere"})
    .attr("class", "sphere")
    .attr("d", path);

circle.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

var feature = svg.selectAll("path");

/*
d3.timer(function() {
    var dt = Date.now() - time;
    projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
    feature.attr("d", path);
});*/