var express = require("express");

var app = express();


app.get("/",(req,res) => {


 res.write("Hola mundo");

res.end();

});

app.listen(process.env.PORT);
