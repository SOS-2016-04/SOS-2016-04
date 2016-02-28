var express=require("express");
var app=express();

app.get("/about/Porcentaje_desempleo_por_sexo", (req,res) =>{
res.write("<html><body>____ Porcentaje de desempleo ____<ul>");

res.write("</li>Se tendra en cuenta el  sexo para comparar los datos de las siguientes regiones:spain,argentina,canada,france,germany,sweden</li>");



res.write("</ul>____ Fin de la presentacion ____<html><body>");
res.end();
});

app.listen(process.env.PORT);
