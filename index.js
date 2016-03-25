var express = require("express");
var bodyParser = require("body-parser");

var populationPercentagesCtlr = require('./populationPercentagesCtlr');

var unemployedCtlr = require('./unemployedCtlr');

var app = express();

var port = (process.env.PORT || 10000);

app.use(bodyParser.json());



var books = [];



app.use("/",express.static(__dirname+"/static"));


app.get("/time", (req,res)=>{

var now = new Date();
res.send("It  is "+now);

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

//////////////      Unemployed       /////////////

/*app.get("/api/v1/population-unemployed-percentage-by-gender/loadInitialData",unemployedCtlr.loadInitialData);

app.get("/api/v1/population-unemployed-percentage-by-gender",unemployedCtlr.getUnemployes);

app.get("/api/v1/population-unemployed-percentage-by-gender/:data",unemployedCtlr.getUnemploye);

app.get("/api/v1/population-unemployed-percentage-by-gender/:country/:year",unemployedCtlr.getUnemployeCountryYear);

app.post("/api/v1/population-unemployed-percentage-by-gender",unemployedCtlr.postUnemployes);

app.post("/api/v1/population-unemployed-percentage-by-gender/:country/:year",unemployedCtlr.postUnemploye);

app.delete("/api/v1/population-unemployed-percentage-by-gender",unemployedCtlr.deleteUnemployes);

app.delete("/api/v1/population-unemployed-percentage-by-gender/:data",unemployedCtlr.deleteUnemploye);

app.delete("/api/v1/population-unemployed-percentage-by-gender/:country/:year",unemployedCtlr.deleteUnemployeCountryYear);

app.put("/api/v1/population-unemployed-percentage-by-gender",unemployedCtlr.putUnemployes);

app.put("/api/v1/population-unemployed-percentage-by-gender/:country/:year",unemployedCtlr.putUnemploye);*/





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
