

var population_percentages = [];

module.exports.loadInitialData = function(req,res){
population_percentages=[{country: "spain", year: 2014, population_0_14: 15, population_15_64: 67},
{country: "spain", year: 2013, population_0_14: 14, population_15_64: 68},
{country: "canada", year: 2014, population_0_14: 16, population_15_64: 68},
{country: "france", year: 2012, population_0_14: 19, population_15_64: 63},
{country: "france", year: 2013, population_0_14: 15, population_15_64: 64},
{country: "sweden", year: 2014, population_0_14: 17, population_15_64: 63}];

res.sendStatus(200);

}


module.exports.getPopulationPercentages = function(req,res){
res.send(population_percentages);
};



module.exports.getPopulationPercentage = function(req,res){
var country = req.params.country;
var resultado = [];
	var encontrado = false;
	for(var i=0;i<population_percentages.length;i++)
	{
		if(population_percentages[i].country == country)
		{
			resultado.push(population_percentages[i]);
			encontrado = true;
		}
    }

    if(encontrado == true)
    {
    	res.send(resultado);
    }

    if(encontrado == false)
    {
	res.sendStatus(404);
    }
}


/*
module.exports.postFootballTeam = function(req,res){
res.send("Error. Metodo no permitido.");
}


module.exports.postFootballTeams = function(req,res){
var team = req.body;
	football_teams.push(team);
	res.send("Datos introducidos correctamente.");
}


module.exports.deleteFootballTeam = function(req,res){
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
}


module.exports.deleteFootballTeams = function(req,res){
 football_teams = [];
 res.send("Datos borrados correctamente.");
}


module.exports.putFootballTeam = function(req,res){
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
}


module.exports.putFootballTeams = function(req,res){
 res.send("Error. Metodo no permitido");
}


*/