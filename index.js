var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var cors=require('cors');
var governify=require('governify');
var populationPercentagesCtlr = require('./populationPercentagesCtlr');
var populationLaborForcePercentage = require('./populationLaborForcePercentage');
var populationUnemployedPercentageByGender = require('./populationUnemployedPercentageByGender');

//var PorcentageUnemployed = require('./PorcentageUnemployed');

var app = express();

var paths = '/api/v1/mort-sickness';
var apiServerHost = 'http://sos-2016-03.herokuapp.com';

app.use(paths, function(req,res){
  var url = apiServerHost + req.baseUrl + req.url;
  console.log("Piped: "+ req.baseUrl + req.url);
  console.log("URL Accesed: "+ url);

  req.pipe(request(url,function (error,response,body){
    if(error){
      console.error(error);
      res.sendStatus(503);
    }
  })).pipe(res);
});

//multiPlan_C2_sos-2016-04-jesgarsan_ag
//multiPlan_C4_sos-2016-04-jesgarsan_ag
governify.control(app,{
  datastore:"http://datastore.governify.io/api/v6.1/",namespace: "sos-2016-04-jesgarsan",defaultPath:"/api/prueba"
});



var port = (process.env.PORT || 10000);

app.use(bodyParser.json());
app.use(cors());

app.get("/api/prueba",(req,res)=>{
  res.send([{name:"prueba1"},{name:"prueba2"}]);
});



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
app.get("/api/v1/population-unemployed-percentage-by-gender/loadInitialData",populationUnemployedPercentageByGender.loadInitialData2);

app.get("/api/v1/population-unemployed-percentage-by-gender",populationUnemployedPercentageByGender.getUnemployes);

app.get("/api/v1/population-unemployed-percentage-by-gender/:data",populationUnemployedPercentageByGender.getUnemploye);

app.get("/api/v1/population-unemployed-percentage-by-gender/:country/:year",populationUnemployedPercentageByGender.getUnemployeCountryYear);

app.post("/api/v1/population-unemployed-percentage-by-gender",populationUnemployedPercentageByGender.postUnemployes);

app.post("/api/v1/population-unemployed-percentage-by-gender/:country/:year",populationUnemployedPercentageByGender.postUnemploye);

app.delete("/api/v1/population-unemployed-percentage-by-gender",populationUnemployedPercentageByGender.deleteUnemployes);

app.delete("/api/v1/population-unemployed-percentage-by-gender/:data",populationUnemployedPercentageByGender.deleteUnemploye);

app.delete("/api/v1/population-unemployed-percentage-by-gender/:country/:year",populationUnemployedPercentageByGender.deleteUnemployeCountryYear);

app.put("/api/v1/population-unemployed-percentage-by-gender",populationUnemployedPercentageByGender.putUnemployes);

app.put("/api/v1/population-unemployed-percentage-by-gender/:country/:year",populationUnemployedPercentageByGender.putUnemploye);


/////////////---------Population Labor Force Percentage---------/////////////

app.get("/api/v1/population-labor-force-percentage-by-education/loadInitialData",populationLaborForcePercentage.loadInitialData3);

app.get("/api/v1/population-labor-force-percentage-by-education",populationLaborForcePercentage.getPopulationLaborForcePercentages);

app.get("/api/v1/population-labor-force-percentage-by-education/:data",populationLaborForcePercentage.getPopulationLaborForcePercentage);

app.get("/api/v1/population-labor-force-percentage-by-education/:country/:year",populationLaborForcePercentage.getPopulationLaborForcePercentageCountryYear);

app.post("/api/v1/population-labor-force-percentage-by-education",populationLaborForcePercentage.postPopulationLaborForcePercentages);

app.post("/api/v1/population-labor-force-percentage-by-education/:country/:year",populationLaborForcePercentage.postPopulationLaborForcePercentage);

app.delete("/api/v1/population-labor-force-percentage-by-education",populationLaborForcePercentage.deletePopulationLaborForcePercentages);

app.delete("/api/v1/population-labor-force-percentage-by-education/:data",populationLaborForcePercentage.deletePopulationLaborForcePercentage);

app.delete("/api/v1/population-labor-force-percentage-by-education/:country/:year",populationLaborForcePercentage.deletePopulationLaborForcePercentageCountryYear);

app.put("/api/v1/population-labor-force-percentage-by-education",populationLaborForcePercentage.putPopulationLaborForcePercentages);

app.put("/api/v1/population-labor-force-percentage-by-education/:country/:year",populationLaborForcePercentage.putPopulationLaborForcePercentage);


app.listen(port);
