var  population_unemployed = [];

module.exports.loadInitialData2 = function(req,res){
	apikey = req.query.apikey;

	if (apikey && apikey=="clave")
	{
population_unemployed=[{country: "spain", year: 2014, female: 26, male: 23.7},
{country: "spain", year: 2013, female: 56.4, male: 57.8},
{country: "canada", year: 2014, female: 6.5, male: 7.3},
{country: "france", year: 2012, female: 23.7, male: 23.9},
{country: "france", year: 2014, female: 9.7, male: 10.1},
{country: "sweden", year: 2014, female: 7.7, male: 8.2}];

res.sendStatus(200);
}else{
	res.sendStatus(401);
}
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
	from = req.query.from;
	to = req.query.to;
	limit = req.query.limit;
	offset = req.query.offset;
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
	from = req.query.from;
	to = req.query.to;
	limit = req.query.limit;
	offset = req.query.offset;
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
var cantidad_atributos=JSON.stringify(req.body).split(",").length;
var cantidad = cantidad_atributos.toString();

if (apikey && apikey=="clave")
{

if(population_unemploye.country === undefined || population_unemploye.year === undefined || population_unemploye.female === undefined || population_unemploye.male === undefined || isNaN(population_unemploye.year) || isNaN(population_unemploye.female)  || isNaN(population_unemploye.male) || cantidad !== "4")
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
var cantidad_atributos=JSON.stringify(req.body).split(",").length;
var cantidad = cantidad_atributos.toString();
if (apikey && apikey=="clave")
{
 if(country!=population_unemploye.country || year!=population_unemploye.year || population_unemploye.country === undefined || population_unemploye.year === undefined || population_unemploye.female === undefined || population_unemploye.male === undefined || isNaN(population_unemploye.year) || isNaN(population_unemploye.female)  || isNaN(population_unemploye.male) || cantidad !== "4")
 {
	 res.sendStatus(400);
 }else{

	for(var i=0;i<tamanho;i++)
	{
		if(population_unemployed[i].country == country && population_unemployed[i].year == year)
		{
			population_unemployed[i].country=population_unemploye.country;
			population_unemployed[i].year=population_unemploye.year;
			population_unemployed[i].male=population_unemploye.male;
			population_unemployed[i].female=population_unemploye.female;
			encontrado = true;
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
	res.sendStatus(401);
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
