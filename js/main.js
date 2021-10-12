// PART 2 of the Assingment, make sure you've done PART 1 first!
// Step 1: Select the body of the HTML document and append an h2 element
// with the text "Starting Part 2! We're Learning D3"
d3.select("body")
    .append("h2")
    .text("Starting Part 2! We're Learning D3");
// Step 2: Select the body again and append a div with the id dynamic-content
d3.select("body")
    .append("div")
    .attr("id", "dynamic-content");

// Step 3: Select the div you just created (using its id!) and append a
// paragraph with some text of your choice (you can also style this if you want!)
d3.select("#dynamic-content")
    .append("p")
    .text("Successfully appended");


// PART II: Binding data

var schools = [
    { name: "Harvard", signups: 4695, region: "Northeast" },
    { name: "UW Madison", signups: 4232, region: "Midwest" },
    { name: "WashU", signups: 3880, region: "Midwest" },
    { name: "Brown", signups: 2603, region: "Northeast" },
    { name: "UChicago", signups: 2088, region: "Midwest" },
    { name: "UW", signups: 2042, region: "West" }
];

// Step 1: Append a new SVG element to HTML document with D3
// (width = 500px, height = 500px)
d3.select("body")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

// Step 2: Append a new SVG circle for every object in the schools array
d3.select("svg").selectAll("circle")
    .data(schools)
    .enter()
    .append("circle");


// Step 3: Define the following dynamic properties for each circle:
//   - Position: set the x/y coordinates and make sure that the circles don’t overlap each other
//   - Radius: schools with over 3500 signups should be twice as big as schools with less than 2500 signups
//   - Colors: use a different color for each region
//   - Border: add a border to every circle (SVG property: stroke)
d3.select("svg").selectAll("circle")
    .data(schools)
   // .enter()
    .attr("cx", function(d, index){
        return (40+index*80)
    })
    .attr("cy", 200)
    .attr("r", function(d){
        if(d.signups > 3500){
            return (40)
        }
        else if(d.signups < 2500){
            return(20)
        }
        else{
            return(30)
        }
    })
    .attr("fill", function(d){
        if(d.region=="Northeast")
            return("red")
        else if(d.region=="Midwest")
            return("blue")
        else{
            return("green")
        }
    })
    .attr("stroke", "black");


// PART III: Loading data

// Step 1: Use D3 to load the CSV file "schools.csv". then, print the data
// to the console and inspect it in your browser

//I moved all the steps into the d3.csv statement below;
//for some reason, filteredData is undefined in later code statements, despite being a global variable
var filteredData;
d3.csv("/data/schools.csv").then(function(data){
    data.forEach(function(d){
        d.signups = +d.signups;
        d.x = +d.x;
        d.y = +d.y;
    });
    console.log(data)
    // Step 2: Filter the dataset: Filter the dataset to only include schools that are
// part of the Datamatch Schools (using the datamatchSchool variable).
     filteredData = data.filter(function(row) {
        // only look at delicious foods!
        return row.signups > 0;
    })
    console.log(filteredData)
    // Step 3: Append a new paragraph to your HTML document that shows the
    // number of Datamatch schools
    d3.select("body").append("p").text(filteredData.length);
    // Step 4: Prepare the data - each value of the CSV file is stored as a string,
    // but we want numerical values to be numbers.
    //already done when schools.csv is parsed


    // Step 5: Draw an SVG circle for each school in the filtered dataset
    //   - All the elements (drawing area + circles) should be added dynamically with D3
    //   - SVG container: width = 700px, height = 550px
    //   - Use the randomly generated x/y coordinates for each school from the dataset to position the circles
    d3.select("body")
        .append("svg")
        .attr("id", "svgCircles")
        .attr("width", 700)
        .attr("height", 550);

    d3.select("#svgCircles").selectAll("circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("fill", "green")
        .attr("cx", function (d){
            return d.x
        })
        .attr("cy", function (d){
            return d.y
        })
        // Step 6: Change the radius of the circle to be data-dependent
        //   - The radius should be 5px for schools with signups less than 500
        //   - The radius for all other schools should be 10px
        .attr("r", function(d){
             if(d.signups < 500){
               return (5)
             }
             else{
                 return(10)
             }
        });

    // Step 7: Add labels with the names of the schools
    //   - Use the SVG text element
    //   - All the elements should be the class of school-label
    //   - The labels should only be visible for schools with signups greater than 500

    d3.select("#svgCircles").selectAll("text")
        .data(filteredData)
        .enter()
        .append("text")
        .attr("id", "school-label")
        .attr("x", function(d){
            return(d.x)
        })
        .attr("y", function(d){
            return(d.y)
        })
        .text(function(d){
            if (d.signups > 500){
                return(d.school)
            }
        })



});

// Step 8: Styling - in the external stylesheet, do some styling
//   - Make sure to at least style school-label with font size = 11 px and
//   text anchor = middle


// Optional bonus step: add tooltips displaying the country for each school
// https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73