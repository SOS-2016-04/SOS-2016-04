var express = require("express");

var app = express();

var port = (process.env.PORT || 10000);

app.use("/",express.static(__dirname+"/static"));


app.get("/time", (req,res)=>{

var now = new Date();
<<<<<<< HEAD
res.send("It is  "+now);
=======
res.send("It is "+now);
>>>>>>> 5d2b2cc741e9c738289ada3672524d3318a46d2d

});



app.listen(port);
