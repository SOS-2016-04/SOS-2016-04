var express = require("express");

var app = express();


app.get("/about",(req,res) => {

 res.write("GROUP 04 ---- THEMATIC\n\n");

 res.write("Our data sources are aimed to analyze relationship between population age, population workforce and unemployment\n\n\n\n");

 res.write("GROUP 04 ---- MEMBERS AND DATA SOURCES\n\n");

 res.write("Jose Manuel Moreno Triguero -> population-percentage-by-age\n");

 res.write("<html>");
 res.write("Alejandro Rodriguez Caro -> ");
 <a href="../population-labor-force-percentage-by-education">population-labor-force-percentage-by-education</a>
 res.write("</html>");

 res.write("Jesus Garcia Sanchez -> population-unemployed-percentage-by-gender\n");

res.end();

});


app.get("/about/population-percentage-by-age",(req,res) => {


 res.write("This data source analyze population percentage between 0 and 14 years ");
 res.write("and between 15 and 64 years filtered by country and year. Examples: \n\n");
 res.write("country: spain --- year: 2014 --- population-0-14: 15% ---population-15-64: 67%");


res.end();

});


app.get("/about/population-labor-force-percentage-by-education",(req,res) => {


  res.write("This data source analyze population percentage labor force by education (Primary, secondary and tertiary). \n\n ");
  res.write("Examples: \n\n");
  res.write("country: spain --- year: 2014 --- primary-education: 39% --- secondary-education: 23% --- tertiary-education: 37%");


res.end();

});


app.get("/about/population-unemployed-percentage-by-gender", (req,res) =>{


  res.write("This data source analyze population percentage unemployed by gender. \n\n");
  res.write("Examples: \n\n");
  res.write("country: spain --- year: 2014 --- female unemployed:26 --- male unemployed:23.7");



res.end();
});


app.listen(process.env.PORT);
