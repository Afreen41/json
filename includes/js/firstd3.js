function plotfirst(){
  var margin = { top: 20, right: 10, bottom: 100, left: 90},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;


  var svg=d3.select("body")
             .append("svg")
             .attr({
           	    "width" : width + margin.right + margin.left,
               	"height" : height + margin.top + margin.bottom 
                 })
             .append("g")
            .attr("transform","translate(" + margin.left + ',' + margin.top +')');

//defining x nd y scales

  var xScale=d3.scale.ordinal()
                     .rangeRoundBands([0,width],0.3,0.2) ; 

  var yScale=d3.scale.linear()
               .range([height,0]); 

//defining axis

var xAxis=d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

var yAxis=d3.svg.axis()
            .scale(yScale)
            .orient("left");



d3.json("../../includes/json/literatepersons.json",function(error,data){
    if(error) console.log("Error: data not found");
 data.forEach(function(d){
d["Literate - Persons"]=+d["Literate - Persons"];
d["Age-group"]=d["Age-group"];
// console.log(d["Literate - Persons"]);
 });   
//  data.sort(function(a,b){
// return b["Literate - Persons"] - a["Literate - Persons"]; 
//  });

 // donmains of x and y scale

 xScale.domain(data.map(function(d){ return d["Age-group"]}));
 yScale.domain([0,d3.max(data,function(d){return d["Literate - Persons"]})]);


 //draw the bars
 svg.selectAll("rect")    
    .data(data)
    .enter()
    .append("rect")
    .attr("height",0)
    .attr("y",height)
    .transition().duration(2000)
    .delay(function(d,i){ return i*100;})
    .attr({
      "x": function(d) { return xScale(d["Age-group"]); },
      "y": function(d) { return yScale(d["Literate - Persons"]); },
      "width" : xScale.rangeBand(),
      "height" : function(d){return height -yScale(d["Literate - Persons"]); }
    })
    .style("fill",function(d,i){ return 'rgb(255,10,100)'})

    // svg.selectAll('text')
    //     .data(data)
    //     .enter()
    //     .append('text')
    //     // .text(function(d){ return (d["Literate - Persons"]);} )
    //     // .attr('x',function(d){ return xScale(d["Age-group"]) + xScale.rangeBand()/2; } )
    //     .attr('y',function(d){ return yScale(d["Literate - Persons"])+12;})
    //     .style("fill","white")
    //     .style("text-anchor","middle");
    // drawing the xAxis

    svg.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0,"+ height+ ")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform","rotate(-70)")
        .attr("dx","-.8em")
        .attr("dy","-.1em")
        .style("text-anchor","end");


    svg.append("g")
    .attr("class","y axis")
    .call(yAxis)
    .style("font-sixe","12px");

  });        
}