var express = require("express");

var app = express();

var port = (process.env.PORT || 10000);

app.use("/",express.static(__dirname+"/static"));


app.get("/time", (req,res)=>{

var now = new Date();
res.send("It is :"+now);

});



app.listen(port);
