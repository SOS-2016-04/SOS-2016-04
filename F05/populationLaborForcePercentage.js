var populationLaborForcePercentage = [];


module.exports.loadInitialData3 = function(req,res){
populationLaborForcePercentage=[{country: "spain", year: 2014, primaryEducation: 39, secondaryEducation: 23, tertiaryEducation: 37},
{country: "argentina", year: 2014, primaryEducation: 35, secondaryEducation: 40, tertiaryEducation: 21},
{country: "canada", year: 2014, primaryEducation: 10, secondaryEducation: 38, tertiaryEducation: 52},
{country: "france", year: 2014, primaryEducation: 18, secondaryEducation: 45, tertiaryEducation: 37},
{country: "germany", year: 2014, primaryEducation: 13, secondaryEducation: 60, tertiaryEducation: 27},
{country: "sweden", year: 2014, primaryEducation: 16, secondaryEducation: 47, tertiaryEducation: 37}];

res.sendStatus(200);

}

module.exports.getPopulationLaborForcePercentages = function(req,res){

from = req.query.from;
to = req.query.to;
limit = req.query.limit;
offset = req.query.offset;
apikey = req.query.apikey;
var resultado = [];


if (apikey && apikey=="secret")
{

for(var i=0;i<populationLaborForcePercentage.length;i++)
{
	resultado.push(populationLaborForcePercentage[i]);
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

resultado.splice(0,offset);
resultado.splice(limit,resultado.length-limit);

}

res.send(resultado);
}

else
{
	res.sendStatus(401);
}


};

module.exports.getPopulationLaborForcePercentage = function(req,res){
var data = req.params.data;
var resultado = [];
	var encontrado = false;
	for(var i=0;i<populationLaborForcePercentages.length;i++)
	{
		if(isNaN(data)  &&  populationLaborForcePercentage[i].country == data)
		{
			resultado.push(populationLaborForcePercentage[i]);
			encontrado = true;
		}

		if(isNaN(data) == false  &&  populationLaborForcePercentage[i].year == data)
		{
			resultado.push(populationLaborForcePercentage[i]);
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

module.exports.getPopulationLaborForcePercentageCountryYear = function(req,res){
var country = req.params.country;
var year = req.params.year;
var resultado = [];
	var encontrado = false;
	for(var i=0;i<populationLaborForcePercentage.length;i++)
	{
		if(populationLaborForcePercentage[i].country == country && populationLaborForcePercentage[i].year == year)
		{
			resultado.push(populationLaborForcePercentage[i]);
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

module.exports.postPopulationLaborForcePercentage = function(req,res){
res.sendStatus(405);
}

module.exports.postPopulationLaborForcePercentages = function(req,res){
var populationLaborForcePercentages = req.body;
var country = req.params.country;
var year = req.params.year;
var primaryEducation = req.params.primaryEducation;
var secondaryEducation = req.params.secondaryEducation;
var tertiaryEducation = req.params.tertiaryEducation;
var existe = false;
var peticion_valida = true;



if(populationLaborForcePercentages.country === undefined || populationLaborForcePercentages.year === undefined || populationLaborForcePercentages.primaryEducation === undefined || populationLaborForcePercentages.secondaryEducation === undefined || populationLaborForcePercentages.tertiaryEducation === undefined || isNaN(populationLaborForcePercentages.year) || isNaN(populationLaborForcePercentages.primaryEducation)  || isNaN(populationLaborForcePercentages.secondaryEducation) || isNaN(populationLaborForcePercentages.tertiaryEducation))
{
	peticion_valida = false;
}



if (peticion_valida == true)
{

	for(var i=0;i<populationLaborForcePercentage.length;i++)
	{
		if(populationLaborForcePercentage[i].country == populationLaborForcePercentages.country && populationLaborForcePercentage[i].year == population_percentages.year)
		{
			existe = true;
		}
    }



if (existe == false)
{
	populationLaborForcePercentage.push(populationLaborForcePercentages);
	res.sendStatus(201);
}
else
{
	res.sendStatus(409);
}

}

else
{
	res.sendStatus(400);
}


}

module.exports.deletePopulationLaborForcePercentage = function(req,res){
    var data = req.params.data;
	var encontrado = false;

	for(var i=0;i<populationLaborForcePercentage.length;i++)
	{
		if(isNaN(data)  &&  populationLaborForcePercentage[i].country == data)
		{
			populationLaborForcePercentage.splice(i,1);
			encontrado = true;
			i=i-1;
		}

		if(isNaN(data) == false  &&  populationLaborForcePercentage[i].year == data)
		{
			populationLaborForcePercentage.splice(i,1);
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

module.exports.deletePopulationLaborForcePercentages = function(req,res){
 populationLaborForcePercentage = [];
 res.sendStatus(200);
}

module.exports.deletePopulationLaborForcePercentageCountryYear = function(req,res){
var country = req.params.country;
var year = req.params.year;
	var encontrado = false;
	for(var i=0;i<populationLaborForcePercentage.length;i++)
	{
		if(populationLaborForcePercentage[i].country == country && populationLaborForcePercentage[i].year == year)
		{
			populationLaborForcePercentage.splice(i,1);
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

module.exports.putPopulationLaborForcePercentage = function(req,res){
    var country = req.params.country;
var year = req.params.year;
var tamanho = populationLaborForcePercentage.length;
var encontrado = false;


	for(var i=0;i<tamanho;i++)
	{
		if(populationLaborForcePercentage[i].country == country && populationLaborForcePercentage[i].year == year)
		{
			populationLaborForcePercentage.push(req.body);
			encontrado = true;
		}
		else
		{
			populationLaborForcePercentage.push(populationLaborForcePercentage[i]);
		}
    }

    populationLaborForcePercentage.splice(0,tamanho);

    if(encontrado == true)
    {
    res.sendStatus(200);
    }
    if(encontrado == false)
    {
	res.sendStatus(404);
    }
}

module.exports.putPopulationLaborForcePercentages = function(req,res){
 res.sendStatus(405);
}
