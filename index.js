var express = require("express");
var bodyParser = require("body-parser");

var populationPercentagesCtlr = require('./populationPercentagesCtlr');

var app = express();

var port = (process.env.PORT || 10000);

app.use(bodyParser.json());


var movies = [];
var books = [];



app.use("/",express.static(__dirname+"/static"));


app.get("/time", (req,res)=>{

var now = new Date();
res.send("It is "+now);

});


app.get("/api/v1/population-percentage-by-age/loadInitialData",populationPercentagesCtlr.loadInitialData);

app.get("/api/v1/population-percentage-by-age",populationPercentagesCtlr.getPopulationPercentages);

app.get("/api/v1/population-percentage-by-age/:data",populationPercentagesCtlr.getPopulationPercentage);

app.get("/api/v1/population-percentage-by-age/:country/:year",populationPercentagesCtlr.getPopulationPercentageCountryYear);

app.post("/api/v1/population-percentage-by-age",populationPercentagesCtlr.postPopulationPercentages);

app.post("/api/v1/population-percentage-by-age/:country/:year",populationPercentagesCtlr.postPopulationPercentage);

app.delete("/api/v1/population-percentage-by-age",populationPercentagesCtlr.deletePopulationPercentages);

app.delete("/api/v1/population-percentage-by-age/:data",populationPercentagesCtlr.deletePopulationPercentage);

app.delete("/api/v1/population-percentage-by-age/:country/:year",populationPercentagesCtlr.deletePopulationPercentageCountryYear);

app.put("/api/v1/population-percentage-by-age",populationPercentagesCtlr.putPopulationPercentages);

app.put("/api/v1/population-percentage-by-age/:country/:year",populationPercentagesCtlr.putPopulationPercentage);





app.get("/api-test/movies/loadInitialData",(req,res) => {
	movies=[{name:"ironman", year:"2008" , id:247},
	                {name:"gladiator", year:"2000", id:275}];
   res.send("Datos inicializados.");
});


app.get("/api/sandbox/movies",(req,res) => {
	res.send(movies);
});

app.get("/api/sandbox/movies/:name",(req,res) => {
	var title = req.params.name;
	var found = false;
	for(var i=0;i<movies.length;i++)
	{
		if(movies[i].name == title)
		{
			res.send(movies[i]);
			found = true;
		}
    }
    if(found == false)
    {
	res.sendStatus(404);
    }
});


app.post("/api/sandbox/movies", (req,res)=> {
	var movie = req.body;
	movies.push(movie);
	res.send("Datos introducidos correctamente.");
});


app.post("/api/sandbox/movies/:equipo", (req,res)=> {
	res.send("Error. Metodo no permitido.");
});


app.delete("/api/sandbox/movies", (req,res)=> {
	movies = [];
	res.send("Datos borrados correctamente.");
});


app.delete("/api/sandbox/movies/:name", (req,res)=> {
	var title = req.params.name;
	var found = false;
	for(var i=0;i<movies.length;i++)
	{
		if(movies[i].name == title)
		{
			movies.splice(i,1);
			found = true;
			res.send("Datos borrados correctamente.")
		}
    }
    if(found == false)
    {
	res.sendStatus(404);
    }
});


app.put("/api/sandbox/movies", (req,res)=> {
	res.send("Error. Metodo no permitido");
});


app.put("/api/sandbox/movies/:name", (req,res)=> {
	var title = req.params.name;
	var found = false;
	for(var i=0;i<movies.length;i++)
	{
		if(movies[i].name == title)
		{
			movies[i] = req.body;
			found = true;
			res.send("Datos introducidos correctamente.");
		}
    }
    if(found == false)
    {
	res.sendStatus(404);
    }
});


/////////////---------BOOKS---------/////////////


app.get("/api-test/books/loadInitialData",(req,res) => {
	books=[{name:"La sombra del viento", year:"2001", author:"Carlos Ruiz Zafón"},
	        {name:"El nombre de la rosa", year:"1980", author:"Umberto Eco"}];
   res.send("Initialized data.");
});


app.get("/api/sandbox/books",(req,res) => {
	res.send(books);
});

app.get("/api/sandbox/books/:name",(req,res) => {
	var title = req.params.name;
	var found = false;
	for(var i=0;i<books.length;i++)
	{
		if(books[i].name == title)
		{
			res.send(books[i]);
			found = true;
		}
    }
    if(found == false)
    {
	res.sendStatus(404);
    }
});


app.post("/api/sandbox/books", (req,res)=> {
	var book = req.body;
	books.push(book);
	res.send("Data entered correctly.");
});


app.post("/api/sandbox/books/:editorial", (req,res)=> {
	res.send("Error. Method Not Allowed.");
});


app.delete("/api/sandbox/books", (req,res)=> {
	books = [];
	res.send("Deleted data correctly.");
});


app.delete("/api/sandbox/books/:name", (req,res)=> {
	var title = req.params.name;
	var found = false;
	for(var i=0;i<books.length;i++)
	{
		if(books[i].name == title)
		{
			books.splice(i,1);
			found = true;
			res.send("Deleted data correctly.")
		}
    }
    if(found == false)
    {
	res.sendStatus(404);
    }
});


app.put("/api/sandbox/books", (req,res)=> {
	res.send("Error. Method Not Allowed.");
});


app.put("/api/sandbox/books/:name", (req,res)=> {
	var title = req.params.name;
	var found = false;
	for(var i=0;i<books.length;i++)
	{
		if(books[i].name == title)
		{
			books[i] = req.body;
			found = true;
			res.send("Data entered correctly.");
		}
    }
    if(found == false)
    {
	res.sendStatus(404);
    }
});


app.listen(port);
