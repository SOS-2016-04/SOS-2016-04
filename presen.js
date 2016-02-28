var express=require("express");
var app=express();

app.get("/about", (req,res) =>{
res.write("<html><body>____ Equipo 04 ____<ul>");

res.write("</li>Formado por:Jesus Garcia Sanchez,Jose Manuel Moreno Triguero y Alejandro Rodriguez Caro</li>");



res.write("</ul>____ Fin de la presentacion ____<html><body>");
res.end();
});

app.listen(process.env.PORT);
