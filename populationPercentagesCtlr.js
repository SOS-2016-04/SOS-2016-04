
var population_percentages = [];

module.exports.loadInitialData = function(req,res){

apikey = req.query.apikey;

if (apikey && apikey=="secret")
{

population_percentages=[{country: "spain", year: 2012, population_0_14: 15, population_15_64: 67},
{country: "spain", year: 2013, population_0_14: 14, population_15_64: 68},
{country: "spain", year: 2014, population_0_14: 15, population_15_64: 67},
{country: "spain", year: 2015, population_0_14: 14, population_15_64: 68},
{country: "france", year: 2012, population_0_14: 19, population_15_64: 63},
{country: "france", year: 2013, population_0_14: 15, population_15_64: 64},
{country: "france", year: 2014, population_0_14: 19, population_15_64: 63},
{country: "france", year: 2015, population_0_14: 15, population_15_64: 64},
{country: "russia", year: 2012, population_0_14: 15, population_15_64: 67},
{country: "russia", year: 2013, population_0_14: 14, population_15_64: 68},
{country: "russia", year: 2014, population_0_14: 15, population_15_64: 67},
{country: "russia", year: 2015, population_0_14: 14, population_15_64: 68},
{country: "sweden", year: 2012, population_0_14: 15, population_15_64: 67},
{country: "sweden", year: 2013, population_0_14: 14, population_15_64: 68},
{country: "sweden", year: 2014, population_0_14: 15, population_15_64: 67},
{country: "sweden", year: 2015, population_0_14: 14, population_15_64: 68}];

res.sendStatus(200);

}

else
{
	res.sendStatus(401);
}

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
var from = req.query.from;
var to = req.query.to;
var data = req.params.data;
var resultado = [];
var resultado_definitivo = [];
var cadena="";
apikey = req.query.apikey;
	var encontrado = false;

if (apikey && apikey=="secret")
{

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

    	for(var i3=0;i3<resultado.length;i3++)
    	{
    		if ( ((from === undefined) == false && parseInt(from) > resultado[i3].year) == false)
    			{
    				if ( ((to === undefined) == false && parseInt(to) < resultado[i3].year) == false)
    				{
    				resultado_definitivo.push(resultado[i3]);
    			    }
    			}   
    }

   res.send(resultado_definitivo);



    }

    if(encontrado == false)
    {
	res.sendStatus(404);
    }

}

else
{
	res.sendStatus(401);
}

}


module.exports.getPopulationPercentageCountryYear = function(req,res){
var country = req.params.country;
var year = req.params.year;
var resultado = [];
apikey = req.query.apikey;
	var encontrado = false;


if (apikey && apikey=="secret")
{

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

else
{
	res.sendStatus(401);
}

}



module.exports.postPopulationPercentage = function(req,res){
res.sendStatus(405);
}


module.exports.postPopulationPercentages = function(req,res){
var population_percentage = req.body;
var country = req.params.country;
var year = req.params.year;
apikey = req.query.apikey;
var population_0_14 = req.params.population_0_14;
var population_15_64 = req.params.population_15_64;
var existe = false;
var peticion_valida = true;
var cantidad_atributos=JSON.stringify(req.body).split(",").length;
var cantidad = cantidad_atributos.toString();

if (apikey && apikey=="secret")
{


if(population_percentage.country === undefined || population_percentage.year === undefined || population_percentage.population_0_14 === undefined || population_percentage.population_15_64 === undefined || isNaN(population_percentage.year) || isNaN(population_percentage.population_0_14)
	|| isNaN(population_percentage.population_15_64) || isNaN(population_percentage.country) == false || cantidad !== "4")
{
	res.sendStatus(400);
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

else
{
	res.sendStatus(401);
}


}




module.exports.deletePopulationPercentage = function(req,res){
    var data = req.params.data;
	var encontrado = false;
	apikey = req.query.apikey;

	if (apikey && apikey=="secret")
{

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

else
{
	res.sendStatus(401);
}



}


module.exports.deletePopulationPercentages = function(req,res){

apikey = req.query.apikey;

if (apikey && apikey=="secret")
{

 population_percentages = [];
 res.sendStatus(200);

}

else
{
	res.sendStatus(401);
}

}




module.exports.deletePopulationPercentageCountryYear = function(req,res){
var country = req.params.country;
apikey = req.query.apikey;
var year = req.params.year;
	var encontrado = false;

if (apikey && apikey=="secret")
{


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

else
{
	res.sendStatus(401);
}

}


module.exports.putPopulationPercentage = function(req,res){
    var country = req.params.country;
var year = req.params.year;
apikey = req.query.apikey;
var tamanho = population_percentages.length;
var encontrado = false;
var mismoIdentificador = true;
var cantidad_atributos=JSON.stringify(req.body).split(",").length;
var cantidad = cantidad_atributos.toString();


if (apikey && apikey=="secret")
{

	if (req.body.country === undefined || req.body.year === undefined || req.body.population_0_14 === undefined ||
		req.body.population_15_64 === undefined || isNaN(req.body.year) || isNaN(req.body.population_0_14) ||
		isNaN(req.body.population_15_64) || cantidad !== "4")
	{
		res.sendStatus(400);
	}

	else

	{

	for(var i=0;i<tamanho;i++)
	{
		if(population_percentages[i].country == country && population_percentages[i].year == year)
		{
			if (country == req.body.country  && year == req.body.year)
			{
			population_percentages.push(req.body);
			encontrado = true;
		}

		else
		{
			population_percentages.push(population_percentages[i]);
			mismoIdentificador = false;
		}


		}
		else
		{
			population_percentages.push(population_percentages[i]);
		}
    }

    population_percentages.splice(0,tamanho);

    if(encontrado == true && mismoIdentificador == true)
    {
    res.sendStatus(200);
    }
    if(encontrado == false && mismoIdentificador == true)
    {
	res.sendStatus(404);
    }
    if(mismoIdentificador == false)
    {
    res.sendStatus(400);
    }

}

}

else
{
	res.sendStatus(401);
}

}


module.exports.putPopulationPercentages = function(req,res){
 res.sendStatus(405);
}
