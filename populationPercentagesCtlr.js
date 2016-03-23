

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
var data = req.params.data;
var resultado = [];
	var encontrado = false;
	for(var i=0;i<population_percentages.length;i++)
	{
		if(isNaN(data)  &&  population_percentages[i].country == data)
		{
			resultado.push(population_percentages[i]);
			encontrado = true;
		}

		if(isNaN(data) == false  &&  population_percentages[i].year == data)
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


module.exports.getPopulationPercentageCountryYear = function(req,res){
var country = req.params.country;
var year = req.params.year;
var resultado = [];
	var encontrado = false;
	for(var i=0;i<population_percentages.length;i++)
	{
		if(population_percentages[i].country == country && population_percentages[i].year == year)
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



module.exports.postPopulationPercentage = function(req,res){
res.sendStatus(405);
}


module.exports.postPopulationPercentages = function(req,res){
var population_percentage = req.body;
	population_percentages.push(population_percentage);
	res.sendStatus(201);
}




module.exports.deletePopulationPercentage = function(req,res){
    var data = req.params.data;
	var encontrado = false;
	for(var i=0;i<population_percentages.length;i++)
	{
		if(isNaN(data)  &&  population_percentages[i].country == data)
		{
			population_percentages.splice(i,1);
			encontrado = true;
			i=i-1;
		}

		if(isNaN(data) == false  &&  population_percentages[i].year == data)
		{
			population_percentages.splice(i,1);
			encontrado = true;
			i=i-1;
		}

    }

    if(encontrado == true)
    {
    	res.sendStatus(200);
    }

    if(encontrado == false)
    {
	res.sendStatus(404);
    }

}


module.exports.deletePopulationPercentages = function(req,res){
 population_percentages = [];
 res.sendStatus(200);
}




module.exports.deletePopulationPercentageCountryYear = function(req,res){
var country = req.params.country;
var year = req.params.year;
	var encontrado = false;
	for(var i=0;i<population_percentages.length;i++)
	{
		if(population_percentages[i].country == country && population_percentages[i].year == year)
		{
			population_percentages.splice(i,1);
			encontrado = true;
			i=i-1;
		}
    }

    if(encontrado == true)
    {
    	res.sendStatus(200);
    }

    if(encontrado == false)
    {
	res.sendStatus(404);
    }

}


module.exports.putPopulationPercentage = function(req,res){
    var country = req.params.country;
    var copia_array = [];
var year = req.params.year;
var encontrado = false;

for(var i=0;i<population_percentages.length;i++)
	{
		copia_array.push(population_percentages[i]);
	}

	population_percentages = [];

	for(var i=0;i<copia_array.length;i++)
	{
		if(copia_array[i].country == country && copia_array[i].year == year)
		{
			population_percentages.push(req.body);
			encontrado = true;
		}
		else
		{
			population_percentages.push(copia_array[i]);
		}
    }

    if(encontrado == true)
    {
    res.sendStatus(200);
    }
    if(encontrado == false)
    {
	res.sendStatus(404);
    }
}


module.exports.putPopulationPercentages = function(req,res){
 res.sendStatus(405);
}


