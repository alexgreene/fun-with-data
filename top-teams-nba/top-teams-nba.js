var top_teams = [ 
    {   label: "1972 Bucks",    x: _.pluck(_1972_bucks, 'G'),    y: _.pluck(_1972_bucks, 'L'),    },
    {   label: "1965 Celtics",    x: _.pluck(_1965_celtics, 'G'),    y: _.pluck(_1965_celtics, 'L'),    },
    {   label: "2006 Pistons",    x: _.pluck(_2006_pistons, 'G'),    y: _.pluck(_2006_pistons, 'L'),    },
    {   label: "1997 Jazz",    x: _.pluck(_1997_jazz, 'G'),    y: _.pluck(_1997_jazz, 'L'),    },
    {   label: "1996 Supersonics",    x: _.pluck(_1996_supersonics, 'G'),    y: _.pluck(_1996_supersonics, 'L'),    },
    {   label: "1960 Celtics",    x: _.pluck(_1960_celtics, 'G'),    y: _.pluck(_1960_celtics, 'L'),    },
    {   label: "2009 Lakers",    x: _.pluck(_2009_lakers, 'G'),    y: _.pluck(_2009_lakers, 'L'),    },
    {   label: "1987 Lakers",    x: _.pluck(_1987_lakers, 'G'),    y: _.pluck(_1987_lakers, 'L'),    },
    {   label: "1983 76ers",    x: _.pluck(_1983_76ers, 'G'),    y: _.pluck(_1983_76ers, 'L'),    },
    {   label: "1950 Nationals",    x: _.pluck(_1950_nationals, 'G'),    y: _.pluck(_1950_nationals, 'L'),    },
    {   label: "2013 Heat",    x: _.pluck(_2013_heat, 'G'),    y: _.pluck(_2013_heat, 'L'),    },
    {   label: "2009 Cavaliers",    x: _.pluck(_2009_cavaliers, 'G'),    y: _.pluck(_2009_cavaliers, 'L'),    },
    {   label: "2008 Celtics",    x: _.pluck(_2008_celtics, 'G'),    y: _.pluck(_2008_celtics, 'L'),    },
    {   label: "1971 Bucks",    x: _.pluck(_1971_bucks, 'G'),    y: _.pluck(_1971_bucks, 'L'),    },
    {   label: "1947 Capitals",    x: _.pluck(_1947_capitals, 'G'),    y: _.pluck(_1947_capitals, 'L'),    },
    {   label: "2015 Warriors",    x: _.pluck(_2015_warriors, 'G'),    y: _.pluck(_2015_warriors, 'L'),    },
    {   label: "2007 Mavericks",    x: _.pluck(_2007_mavericks, 'G'),    y: _.pluck(_2007_mavericks, 'L'),    },
    {   label: "2000 Lakers",    x: _.pluck(_2000_lakers, 'G'),    y: _.pluck(_2000_lakers, 'L'),    },
    {   label: "1992 Bulls",    x: _.pluck(_1992_bulls, 'G'),    y: _.pluck(_1992_bulls, 'L'),    },
    {   label: "1986 Celtics",    x: _.pluck(_1986_celtics, 'G'),    y: _.pluck(_1986_celtics, 'L'),    },
    {   label: "1973 Celtics",    x: _.pluck(_1973_celtics, 'G'),    y: _.pluck(_1973_celtics, 'L'),    },
    {   label: "1967 76ers",    x: _.pluck(_1967_76ers, 'G'),    y: _.pluck(_1967_76ers, 'L'),    },
    {   label: "1997 Bulls",    x: _.pluck(_1997_bulls, 'G'),    y: _.pluck(_1997_bulls, 'L'),    },
    {   label: "1972 Lakers",    x: _.pluck(_1972_lakers, 'G'),    y: _.pluck(_1972_lakers, 'L'),    },
    {   label: "1996 Bulls",    x: _.pluck(_1996_bulls, 'G'),    y: _.pluck(_1996_bulls, 'L'),    },
    {   label: "2016 Warriors",    x: _.pluck(_2016_warriors, 'G'),    y: _.pluck(_2016_warriors, 'L'),    },
];

var svg = d3.select("#chart").append("svg").datum(top_teams).call( top_teams_chart() ) ;

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font", "20px sans-serif")
    .style("font-family", "Inconsolata")
    .style("background-color", "whitesmoke")
    .style("border-bottom", "thick dotted gray");

function top_teams_chart() {
    var xlabel = "Games Played",
        ylabel = "Losses" ;


    
    function chart(selection) {
        /* for each dataset in our data, add a line to the chart */
        selection.each(function(datasets) {
            
            var margin = {top: 20, right: 80, bottom: 30, left: 50}, 
                width = parseInt(d3.select('#chart').style('width'), 10),
                height = 600,
                innerwidth = width - margin.left - margin.right,
                innerheight = height - margin.top - margin.bottom ;
                percent = d3.format('%');
            
            /* set the scale of the x axis */
            var x_scale = d3.scale.linear()
                .range([0, innerwidth])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
                          d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
            
            /* set the scale of the y axis */
            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }),
                          d3.max(datasets, function(d) { return d3.max(d.y); }) ]) ;

            /* set the scale for line colors */
            var colors = [];
            var color_scale = d3.scale.linear().range(['powderblue', 'red']).domain([0, 23]);
            /* - - - - - - - - - - - */

            /* create axis for chart */
            var x_axis = d3.svg.axis().scale(x_scale).orient("bottom") ;
            var y_axis = d3.svg.axis().scale(y_scale).orient("left") ;
            /* - - - - - - - - - - - */

            /* create grid lines for the chart*/
            var x_grid = d3.svg.axis().scale(x_scale).orient("bottom").tickSize(-innerheight).tickFormat("");
            var y_grid = d3.svg.axis().scale(y_scale).orient("left") .tickSize(-innerwidth).tickFormat("");
            /* - - - - - - - - - - - */

            var draw_line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) { return x_scale(d[0]); })
                .y(function(d) { return y_scale(d[1]); }) ;

            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
            
            /* append grid lines to the chart */
            svg.append("g").attr("class", "x grid").attr("transform", "translate(0," + innerheight + ")").call(x_grid) ;
            svg.append("g").attr("class", "y grid").call(y_grid) ;
            /* - - - - - - - - - - - */

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerheight + ")") 
                .call(x_axis)
                .append("text")
                .attr("dy", "-.71em")
                .attr("x", innerwidth)
                .style("text-anchor", "end")
                .text(xlabel) ;
            
            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text(ylabel) ;

            var data_lines = svg.selectAll(".d3_xy_chart_line")
                .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
                .enter().append("g")
                .attr("class", "d3_xy_chart_line") ;
            
            data_lines.append("path")
                .attr("class", "line")
                .attr("d", function(d) {return draw_line(d); })
                .attr("stroke", function(_, i) {return color_scale(i);})
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("mousemove", function(){
                    return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
                });
        }) ;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.xlabel = function(value) {
        if(!arguments.length) return xlabel ;
        xlabel = value ;
        return chart ;
    } ;

    chart.ylabel = function(value) {
        if(!arguments.length) return ylabel ;
        ylabel = value ;
        return chart ;
    } ;

    return chart;
}

function mouseover(d, i) {

    d3.select(this).style("opacity", "1");
    return tooltip.style("visibility", "visible").text(top_teams[i].label);
};

function mouseout(d, i) {
    d3.select(this).style("opacity", "0.15");
    return tooltip.style("visibility", "hidden");
                   
};
