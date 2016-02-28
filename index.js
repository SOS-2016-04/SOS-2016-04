var express = require("express");

var app = express();


app.get("/about",(req,res) => {


 res.write("GROUP 04 ---- MEMBERS AND DATA SOURCES\n\n");

 res.write("José Manuel Moreno Triguero -> ");

res.end();

});


app.get("/about/population-percentage-by-age",(req,res) => {


 res.write("Aqui iria la fuente de datos de Moreno");

res.end();

});


app.get("/about/fuente-de-datos-de-alex",(req,res) => {


 res.write("Aqui iria la fuente de datos de Alex");

res.end();

});


app.get("/about/fuente-de-datos-de-jesus",(req,res) => {


 res.write("Aqui iria la fuente de datos de Jesus");

res.end();

});


app.listen(process.env.PORT);
