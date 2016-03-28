var express = require("express");
var bodyParser = require("body-parser");

var populationPercentagesCtlr = require('./populationPercentagesCtlr');
var populationLaborForcePercentage = require('./population-labor-force-percentage');

//var PorcentageUnemployed = require('./PorcentageUnemployed');

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
app.get("/api/v1/population-unemployed-percentage-by-gender/loadInitialData",populationPercentagesCtlr.loadInitialData2);

app.get("/api/v1/population-unemployed-percentage-by-gender",populationPercentagesCtlr.getUnemployes);

app.get("/api/v1/population-unemployed-percentage-by-gender/:data",populationPercentagesCtlr.getUnemploye);

app.get("/api/v1/population-unemployed-percentage-by-gender/:country/:year",populationPercentagesCtlr.getUnemployeCountryYear);

app.post("/api/v1/population-unemployed-percentage-by-gender",populationPercentagesCtlr.postUnemployes);

app.post("/api/v1/population-unemployed-percentage-by-gender/:country/:year",populationPercentagesCtlr.postUnemploye);

app.delete("/api/v1/population-unemployed-percentage-by-gender",populationPercentagesCtlr.deleteUnemployes);

app.delete("/api/v1/population-unemployed-percentage-by-gender/:data",populationPercentagesCtlr.deleteUnemploye);

app.delete("/api/v1/population-unemployed-percentage-by-gender/:country/:year",populationPercentagesCtlr.deleteUnemployeCountryYear);

app.put("/api/v1/population-unemployed-percentage-by-gender",populationPercentagesCtlr.putUnemployes);

app.put("/api/v1/population-unemployed-percentage-by-gender/:country/:year",populationPercentagesCtlr.putUnemploye);


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
