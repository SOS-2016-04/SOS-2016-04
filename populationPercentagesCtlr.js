

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

from = req.query.from;
to = req.query.to;
limit = req.query.limit;
offset = req.query.offset;
var resultado = [];



for(var i=0;i<population_percentages.length;i++)
{
	resultado.push(population_percentages[i]);
}

if (from && to)
{
for(var i=0;i<resultado.length;i++)
{	
if(resultado[i].year < from  ||  resultado[i].year > to)
{
	resultado.splice(i,1);
	i = i - 1;
}}}



if(limit && offset)
{




}

resultado.splice(0,10000);
resultado.splice(10000,10000)

res.send(resultado);



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
var year = req.params.year;
var tamanho = population_percentages.length;
var encontrado = false;


	for(var i=0;i<tamanho;i++)
	{
		if(population_percentages[i].country == country && population_percentages[i].year == year)
		{
			population_percentages.push(req.body);
			encontrado = true;
		}
		else
		{
			population_percentages.push(population_percentages[i]);
		}
    }

    population_percentages.splice(0,tamanho);

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


