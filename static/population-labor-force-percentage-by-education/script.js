var seleccionado = false;
var nuevoDato = true;


function IniciarTabla(data){




  var datos = data;

  var table =  $('#tablaid').DataTable( {
    "data": datos,
    "columns": [
      { "title": "Country" },
      { "title": "Year" },
      { "title": "primaryEducation" },
      { "title": "secondaryEducation"},
      { "title": "tertiaryEducation"}
    ],
        "bPaginate": false,
        "bFilter": false,
        "bSort" : false

    } );
  return table;


}

function procesarDatos(){

  var dato = [];
  var res = [];


  var request = $.ajax({
    url: 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education?apikey=clave',
    type: "GET",
    async: false
  });
  request.always(function(data,status,jqXHR) {
      console.log(data);
      for(var i in data){
        console.log(i);
        var obj = data[i];
        console.log(obj);
        for(var prop in obj){
          console.log(prop);
          dato.push(obj[prop]);
        }
        res.push(dato);
        dato = [];
      }
      console.log(res);
  });
  return res; //Devuelve un array(res) de arrays(dato) con los datos que hay en ese momento en la api
}
