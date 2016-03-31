var  population_unemployed = [];

module.exports.loadInitialData2 = function(req,res){
population_unemployed=[{country: "spain", year: 2014, female: 26, male: 23.7},
{country: "spain", year: 2013, female: 56.4, male: 57.8},
{country: "canada", year: 2014, female: 6.5, male: 7.3},
{country: "france", year: 2012, female: 23.7, male: 23.9},
{country: "france", year: 2014, female: 9.7, male: 10.1},
{country: "sweden", year: 2014, female: 7.7, male: 8.2}];

res.sendStatus(200);

}


module.exports.getUnemployes = function(req,res){

from = req.query.from;
to = req.query.to;
limit = req.query.limit;
offset = req.query.offset;
apikey = req.query.apikey;
var resultado = [];


if (apikey && apikey=="clave")
{

for(var i=0;i<population_unemployed.length;i++)
{
	resultado.push(population_unemployed[i]);
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



module.exports.getUnemploye = function(req,res){
	apikey = req.query.apikey;
var data = req.params.data;
var resultado = [];
	var encontrado = false;
	if (apikey && apikey=="clave")
	{
	for(var i=0;i<population_unemployed.length;i++)
	{
		if(isNaN(data)  && population_unemployed[i].country == data)
		{
			resultado.push(population_unemployed[i]);
			encontrado = true;
		}

		if(isNaN(data) == false  &&  population_unemployed[i].year == data)
		{
			resultado.push(population_unemployed[i]);
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
	}else{
		res.sendStatus(401);
	}
}


module.exports.getUnemployeCountryYear = function(req,res){
	apikey = req.query.apikey;
var country = req.params.country;
var year = req.params.year;
var resultado = [];
	var encontrado = false;

	if (apikey && apikey=="clave")
	{
	for(var i=0;i<population_unemployed.length;i++)
	{
		if(population_unemployed[i].country == country && population_unemployed[i].year == year)
		{
			resultado.push(population_unemployed[i]);
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
}else{
	res.sendStatus(401);
}
}



module.exports.postUnemploye = function(req,res){
	apikey = req.query.apikey;
	if (apikey && apikey=="clave")
	{
res.sendStatus(405);
}else{
	res.sendStatus(401);
}
}


module.exports.postUnemployes = function(req,res){
	apikey = req.query.apikey;
var population_unemploye = req.body;
var country = req.params.country;
var year = req.params.year;
var female = req.params.female;
var male = req.params.male;
var existe = false;
var peticion_valida = true;

if (apikey && apikey=="clave")
{

if(population_unemploye.country === undefined || population_unemploye.year === undefined || population_unemploye.female === undefined || population_unemploye.male === undefined || isNaN(population_unemploye.year) || isNaN(population_unemploye.female)  || isNaN(population_unemploye.male)|| req.body.length!=4)
{
	peticion_valida = false;
}



if ( peticion_valida == true)
{

	for(var i=0;i<population_unemployed.length;i++)
	{
		if(population_unemployed[i].country == population_unemploye.country && population_unemployed[i].year == population_unemploye.year)
		{
			existe = true;
		}
    }



if (existe == false)
{
	population_unemployed.push(population_unemploye);
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
}else{
	res.sendStatus(401);
}

}




module.exports.deleteUnemploye = function(req,res){
	apikey = req.query.apikey;
    var data = req.params.data;
	var encontrado = false;

	if (apikey && apikey=="clave")
	{
	for(var i=0;i<population_unemployed.length;i++)
	{
		if(isNaN(data)  &&  population_unemployed[i].country == data)
		{
			population_unemployed.splice(i,1);
			encontrado = true;
			i=i-1;
		}

		if(isNaN(data) == false  &&  population_unemployed[i].year == data)
		{
			population_unemployed.splice(i,1);
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

}else{
	res.sendStatus(401);
}

}


module.exports.deleteUnemployes = function(req,res){
	apikey = req.query.apikey;
	if (apikey && apikey=="clave")
	{
 population_unemployed = [];
 res.sendStatus(200);
 }else{
	 res.sendStatus(401);
 }
}




module.exports.deleteUnemployeCountryYear = function(req,res){
	apikey = req.query.apikey;
var country = req.params.country;
var year = req.params.year;
	var encontrado = false;
	if (apikey && apikey=="clave")
	{
	for(var i=0;i<population_unemployed.length;i++)
	{
		if(population_unemployed[i].country == country && population_unemployed[i].year == year)
		{
			population_unemployed.splice(i,1);
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
}else{
	res.sendStatus(401);
}
}


module.exports.putUnemploye = function(req,res){
	apikey = req.query.apikey;
	var population_unemploye = req.body;
    var country = req.params.country;
var year = req.params.year;
var tamanho = population_unemployed.length;
var encontrado = false;
if (apikey && apikey=="clave")
{
if(population_unemploye.country === undefined || population_unemploye.year === undefined || population_unemploye.female === undefined || population_unemploye.male === undefined || isNaN(population_unemploye.year) || isNaN(population_unemploye.female)  || isNaN(population_unemploye.male))
{
	res.sendStatus(400);
}else{

	for(var i=0;i<tamanho;i++)
	{
		if(population_unemployed[i].country == country && population_unemployed[i].year == year)
		{
		 if(country==population_unemploye.country && year==population_unemploye.year){
			population_unemployed[i].country=population_unemploye.country;
			population_unemployed[i].year=population_unemploye.year;
			population_unemployed[i].male=population_unemploye.male;
			population_unemployed[i].female=population_unemploye.female;
			encontrado = true;
		 }else{
			res.sendStatus(400);
		}
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
}else{
	res.sendStatus(400);
}
}


module.exports.putUnemployes = function(req,res){
	apikey = req.query.apikey;
	if (apikey && apikey=="clave")
	{
 res.sendStatus(405);
 }else{
	 res.sendStatus(401);
 }
}




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
apikey = req.query.apikey;
var resultado = [];


if (apikey && apikey=="secret")
{

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
var country = req.params.country;
var year = req.params.year;
var population_0_14 = req.params.population_0_14;
var population_15_64 = req.params.population_15_64;
var existe = false;
var peticion_valida = true;



if(population_percentage.country === undefined || population_percentage.year === undefined || population_percentage.population_0_14 === undefined || population_percentage.population_15_64 === undefined || isNaN(population_percentage.year) || isNaN(population_percentage.population_0_14)  || isNaN(population_percentage.population_15_64))
{
	peticion_valida = false;
}



if (peticion_valida == true)
{

	for(var i=0;i<population_percentages.length;i++)
	{
		if(population_percentages[i].country == population_percentage.country && population_percentages[i].year == population_percentage.year)
		{
			existe = true;
		}
    }



if (existe == false)
{
	population_percentages.push(population_percentage);
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
