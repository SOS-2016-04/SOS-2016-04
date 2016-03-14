var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var port = (process.env.PORT || 10000);

app.use(bodyParser.json());

var football_teams = [];
var movies = [];



app.use("/",express.static(__dirname+"/static"));


app.get("/time", (req,res)=>{

var now = new Date();
res.send("It is "+now);

});


app.get("/api-test/football-teams/loadInitialData",(req,res) => {
	football_teams=[{name:"Betis", stadium:"Benito Villamarin" , founded:1907},
	                {name:"Valencia", stadium:"Mestalla", founded:1923}];
   res.send("Datos inicializados correctamente.");
});


app.get("/api/sandbox/football-teams",(req,res) => {
	res.send(football_teams);
});

app.get("/api/sandbox/football-teams/:name",(req,res) => {
	var team_name = req.params.name;
	var encontrado = false;
	for(var i=0;i<football_teams.length;i++)
	{
		if(football_teams[i].name == team_name)
		{
			res.send(football_teams[i]);
			encontrado = true;
		}
    }
    if(encontrado == false)
    {
	res.sendStatus(404);
    }
});


app.post("/api/sandbox/football-teams", (req,res)=> {
	var team = req.body;
	football_teams.push(team);
	res.send("Datos introducidos correctamente.");
});


app.post("/api/sandbox/football-teams/:equipo", (req,res)=> {
	res.send("Error. Metodo no permitido.");
});


app.delete("/api/sandbox/football-teams", (req,res)=> {
	football_teams = [];
	res.send("Datos borrados correctamente.");
});


app.delete("/api/sandbox/football-teams/:name", (req,res)=> {
	var team_name = req.params.name;
	var encontrado = false;
	for(var i=0;i<football_teams.length;i++)
	{
		if(football_teams[i].name == team_name)
		{
			football_teams.splice(i,1);
			encontrado = true;
			res.send("Datos borrados correctamente.")
		}
    }
    if(encontrado == false)
    {
	res.sendStatus(404);
    }
});


app.put("/api/sandbox/football-teams", (req,res)=> {
	res.send("Error. Metodo no permitido");
});


app.put("/api/sandbox/football-teams/:name", (req,res)=> {
	var team_name = req.params.name;
	var encontrado = false;
	for(var i=0;i<football_teams.length;i++)
	{
		if(football_teams[i].name == team_name)
		{
			football_teams[i] = req.body;
			encontrado = true;
			res.send("Datos introducidos correctamente.");
		}
    }
    if(encontrado == false)
    {
	res.sendStatus(404);
    }
});


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


app.listen(port);
