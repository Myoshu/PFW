var w = 1920,
    h = 1080;
    time = Date.now();

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    /*.call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))*/
    .append("g");

var circle = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return (d.galX*5)+w/2;
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
    .on("click", function() {
        zoom(this);
    });

/*To the Sun*/
function toSun() {
    //resetZoom();

    /*var cx = d3.select(circle[0][0]).attr("cx");
    var cy = d3.select(circle[0][0]).attr("cy");*/
    //var dt = Date.now() - time;

    //setInterval(function(){
      //  dt = Date.now() - time;

        var cx = d3.selectAll("circle")._groups[0][0].attributes.cx.value;
        var cy = d3.selectAll("circle")._groups[0][0].attributes.cy.value;

        circle.transition()
            .duration(120000)
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(" + 100 + ")translate(" + -cx + "," + -cy + ")");
    //}, dt);
}
/*To that Star*/
function zoom(star) {
    console.log(d3.select(star).attr("name"));
    var cx = d3.select(star).attr("cx");
    //console.log(cx);
    var cy = d3.select(star).attr("cy");

    svg.transition()
        .duration(1000)
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(" + 2 + ")translate(" + -cx + "," + -cy + ")")
        .on("end", function() {
            toSun();
        });
}
function resetZoom() {
    console.log("test");
    //svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
}

function getData() {
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
    getData();
}
