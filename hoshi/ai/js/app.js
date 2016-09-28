var testdata = [
    { starName:"Sol", id:101, mass:1.9891E+30, diameter:1392000, galX:0, galY:0, galZ:0,  dist:0, starType:"G2(V)", temp:5760, color:"#fff5ec"},
    { starName:"Proxima Centauri", id:203, mass:2.446593E+29, diameter:1453, galX:2.972, galY:-2.994, galZ:-0.077,  dist:4.22, starType:"M5(V)", temp:2680, color:"#ffcd75"},
    { starName:"Alpha Centauri", id:201, mass:2.18801E+30, diameter:1707984, galX:3.205, galY:-3.014, galZ:0.035,  dist:4.4, starType:"G2(V)", temp:5760, color:"#fff5ec"}
]

var w = 1920,
    h = 1080;

function getProjection(star) {
    var projection = d3.geoOrthographic()
        .scale(star.diameter/1000000)
        .translate([star.galX*5 + w/2, star.galY + h/2])
        .clipAngle(90 + 1e-6)
        .precision(.3);

    return projection;
}

function getPath(star) {
    var path = d3.geoPath()
        .projection(getProjection(star));

    return path;
}

var graticule = d3.geoGraticule();

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

var path = svg.selectAll("path")
    .data(dataset)
    .enter().append("path")
    .attr("name", function (d) {
        return d.starName;
    })
    .each(
        function(d) {
            //console.log(d);
            d3.select(this)
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", getPath(d))
                .attr("fill", d.color)
                //.attr("stroke", d.color+10);
        }
    )

function toSun() {
    /*var cx = dataset[0].galX;
    var cy = dataset[0].galY;

    path.transition()
        .duration(120000)
        .attr("transform", "translate(" + w/2 + "," + h/2 + ")scale(" + dataset[0].diameter/50000 + ")translate(" + -(cx*5 + w/2) + "," + -(cy + h/2) + ")");*/

    svg.selectAll("path")
        .data(dataset)
        .each(
            function(d) {
                var cx = d.galX;
                var cy = d.galY;

                d3.select(this)
                    .transition()
                    .duration(120000)
                    //.attr("transform", "translate(" + w/2 + "," + h/2 + ")scale(" + d.diameter/500000 + ")translate(" + -(d.galX*5 + w/2) + "," + -(d.galY + h/2) + ")")
                    //ako je ovako onda uradi da nestanu na određenoj blizini
                    .attr("transform", "translate(" + -(d.galX*5 + w/2) + "," + -(d.galY + h/2) + ")scale(" + d.diameter/50000 + ")")
                    /*.on("end", function() {
                       d3.select(this).style("opacity", 0);
                    });*/
            });

    /*path.transition()
        .duration(12000)
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(" + 100 + ")translate(" + -cx + "," + -cy + ")");
        //.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(" + 100 + ")translate(" + -cx + "," + -cy + ")");*/
}

function getData() {
    //var starURL = "https://en.wikipedia.org/wiki/Epsilon_Scorpii";
    var starURL = "https://en.wikipedia.org/w/api.php?action=query&titles"
    var playListURL = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=India&prop=revisions&rvprop=content&callback=?';

    $.getJSON(playListURL ,function(data) {
        var hash = data
        var page_value = ""
        $.each(data["query"]["pages"],function(k,v){
            alert(k)
            $.each(v,function(key,val){
                alert(key)
            });
        });
    });
}

window.onload = function() {
    toSun();
    //getData();
}
