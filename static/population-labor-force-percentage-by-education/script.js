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
  paginacion2();
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

function seleccionarCelda(data){
  var table = data;
  $('#tablaid tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      seleccionado = false;
      $(this).removeClass('selected');
    }else{
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
      seleccionado = true;
    }
    console.log(table.$('tr.selected'));
  } );
}

function vaciarCajas(){
  document.getElementById("pais").value = "";
  document.getElementById("anno").value = "";
  document.getElementById("primaryEducation2").value = "";
  document.getElementById("secondaryEducation").value = "";
  document.getElementById("tertiaryEducation").value = "";
  document.getElementById("apikey").value = "";
}

//La utilizo para saber que recurso tengo que borrar o editar de la api
function conseguirDato(){
  var table =  $('#tablaid').DataTable();
  var dato = table.row('.selected').data().toString();
  console.log("Fila sin trocear: "+dato);
  var campos = dato.split(",");
  console.log("Fila troceada: "+campos);
  return campos;
}

//Se ejecuta segundo
function enviarDato(){
  var r= $("#pais").val()
var y= $("#anno").val()
var a= $("#primaryEducation").val()
var m= $("#secondaryEducation").val()
var w= $("#tertiaryEducation").val()
var datos='{"country":"'+r+'","year":"'+y+'","primaryEducation":"'+a+'","secondaryEducation":"'+m+'","tertiaryEducation":"'+w+'"}';

if(nuevoDato){
      console.log(datos);
      console.log(nuevoDato);
      console.log("Metodo POST");
      //Es un nuevo dato (añadir dato) POST
      var metodo = "POST";
      var url = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education?apikey=' + $("#apikey").val();
      solicitudAjax(metodo, url, datos);

    }else{
      console.log("Metodo PUT");
      var metodo = "PUT";
      var url = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+$("#pais").val()+'/'+$("#anno").val()+'?apikey='+$("#apikey").val();
      solicitudAjax(metodo, url, datos);
    }
    //vaciarCajas();
}



function botonMenu(){
  $("#formulario2").slideUp();
  $("#tabla").slideDown();

  //$("#nav li").removeClass("active");
  $("#botonDatos").addClass("active");
  vaciarCajas();
}

//Se ejecuta primero
function botonAnadirDato(){
  $("#taba").slideDown();
  $("#formulario3").slideToggle();
  $("#formulario2").slideDown();

  seleccionado = false;
  $('tr.selected').removeClass('selected');
  $("#tituloFormulario").text("Añadir un nuevo dato:");
  nuevoDato = true;
  console.log("¿Es un nuevo dato?: "+nuevoDato);
  $("#region2").prop('disabled', false);
  $("#year").prop('disabled', false);
  $("#nav li").removeClass("active");
  $("#botonAnadirDato").addClass("active");
  vaciarCajas();
}

function botonEditarDato(){
  nuevoDato = false;
  console.log("Is a new Data?: "+nuevoDato);
  if(seleccionado){
    $("#tabla").slideUp();
    $("#formulario2").slideDown();
    $("#tituloFormulario").text("Editar dato:");
    $("#nav li").removeClass("active");
    $("#botonEditarDato").addClass("active");
    var campos = conseguirDato();
    $("#pais").val(campos[0]);
    $("#pais").prop('disabled', true);
    console.log(campos[0]);
    $("#anno").val(campos[1]);
    $("#anno").prop('disabled', true);
    console.log(campos[1]);
    $("#primaryEducation").val(campos[2]);
    $("#secondaryEducation").val(campos[3]);
    $("#tertiaryEducation").val(campos[4]);
    $("#apikey").val(campos[5]);
  }else{
    alertify.alert("You have not selected any data");
  }
}


function botonEliminarDato(){
  if(seleccionado){
      var table =  $('#tablaid').DataTable();
      console.log(table);
      var campos = conseguirDato();
      var urlstring = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+'/'+campos[0]+'/'+campos[1]+'?apikey=' + $("#apikey").val();
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
  request.success(function(status,jqXHR){
  var x;
  if(seleccionado){
    alertify.confirm("Do you want to delete the data?", function (e) {
        if (e) {
      var table =  $('#tablaid').DataTable();
      console.log(x);
      var campos = conseguirDato();
      var urlstring = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+'/'+campos[0]+'/'+campos[1]+'?apikey=' + $("#apikey").val();
      console.log(urlstring);
      table.row('.selected').remove().draw( false );
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
      seleccionado = false;
      x = "Aceptado";
      alertify.alert("Data deleted.");
        }else{
      x = "Cancelado";
        }});
  }else{
    alertify.alert("Select any data.");
  }
  console.log(x);
  //console.log("Dato borrado");
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added.");
    }
    if(jqXHR.status == 401){
      alertify.alert("The key entered is incorrect");
    }
    if(jqXHR.status == 404){
      alertify.alert("Data not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" It remains to fill some field or any incorrect.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" It already exists.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No exite the parameter to edit.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Internal error.");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}else{
  alertify.alert("Select any data.");
}
}

function botonEliminarTodo(){


  var x;

    alertify.confirm("Sure you want to delete all data?", function (e) {
      if (e) {
    console.log(x);

    var urlstring = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education?apikey=' + $("#apikey").val();
    console.log($("#apikey").val());
    var method = "DELETE";
    var request = $.ajax({
      url: urlstring,
      type: method
    });
    request.success(function(status,jqXHR) {
    var table =  $('#tablaid').DataTable();
    table.rows().remove().draw(false);
    });
    x = "Aceptado";
    alertify.alert("Data deleted.", function(){
      location.reload();
    });
  }else{
x = "Cancelado";
  }});

    console.log("Datos borrado");
    request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data addeds");
    }
    if(jqXHR.status == 401){
      alertify.alert("Data added");
    }
    if(jqXHR.status == 404){
      alertify.alert("Data not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" It remains to fill some field or any incorrect.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" It already exists.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No exite the parameter to edit.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Internal error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });

}
function actualizarTabla(){
  var table =  $('#tablaid').DataTable();
  table.row.add( [
              $("#pais").val(),
              $("#anno").val(),
              $("#primaryEducation").val(),
              $("#secondaryEducation").val(),
              $("#tertiaryEducation").val()
          ] ).draw();
  table.row('.selected').remove().draw( false );
  paginacion2();
}

function solicitudAjax(metodo, url, datos){
  var jqery
  var request = $.ajax({
    url: url,
    type: metodo,
    data: datos,
    contentType: "application/json"
  });
  request.done(function(data,status,jqXHR) {
    if(status == "success"){
    console.log(jqXHR);
    console.log(status);
    console.log("jqXHR : "+jqXHR);
    console.log("jqXHR status : "+jqXHR.status);
    console.log("texto codigo :"+jqXHR.statusText);
    console.log("status : "+status);
    alertify.alert("Data loaded successfully. Click OK to reload the page.", function () {
      location.reload();
  });
    actualizarTabla();
    vaciarCajas();
    if(metodo == "PUT"){
      botonMenu();
      seleccionado = false;
    }
    }
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data loaded successfully. Click OK to reload the page.", function () {
      location.reload();
  });
    }
    if(jqXHR.status == 401){
      alertify.alert("Data added");
    }
    if(jqXHR.status == 404){
      alertify.alert("Data not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" To fill some parameter is missing or wrong type.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" It already exists.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No match the parameter to edit.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Internal error del Servidor");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}

function cargaInicial(){

  var apikey= document.getElementById("apikey").value;
  var urlstring = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/loadInitialData?apikey=' + apikey;
  var method = "GET";
  var request = $.ajax({
    url: urlstring,
    type: method,
    async: false
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 401){
      alertify.alert("Incorrect password");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Internal Server Error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR) {
    console.log("Datos cargados");
    alertify.alert("Data loaded successfully.", function () {
      location.reload();
  });
  });

}

function eliminardato(){
  var country = document.getElementById("pai").value;
  var year = document.getElementById("ann").value;

  if(country!='' && year!=''){
      var table =  $('#tablaid').DataTable();

      var urlstring = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+'/'+country+'/'+year+'?apikey=' + $("#apikey").val();
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
  request.success(function(status,jqXHR){
  var x;

    alertify.confirm("Do you want to delete the data?", function (e) {
        if (e) {
      var table =  $('#tablaid').DataTable();
      console.log(x);

      var urlstring = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+'/'+country+'/'+year+'?apikey=' + $("#apikey").val();
      console.log(urlstring);
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
      seleccionado = false;
      x = "Aceptado";
      alertify.alert("Data deleted.", function(){
        location.reload();
      });
        }else{
      x = "Cancelado";
        }});

  console.log(x);

  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
		if(jqXHR.status == 0){
      alertify.alert("Data added.");
    }
    if(jqXHR.status == 401){
      alertify.alert("Data added");
    }
    if(jqXHR.status == 404){
      alertify.alert("Data not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" It remains to fill some field or any incorrect.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" It already exists.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No exite the parameter to edit.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Internal error.");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}else{
  alertify.alert("Select any data.");
}

}

function editardato(){
    var country = document.getElementById("pai2").value;
    var year = document.getElementById("ann2").value;
    nuevoDato = false;
    console.log("¿El dato es nuevo?: "+nuevoDato);



  var metodo = "GET";
  var url = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+country+'/'+year+'?apikey='+$("#apikey").val();
    var request = $.ajax({
    url: url,
    type: metodo,
    data: '{}',
    contentType: "application/json"
  });

  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
		if(jqXHR.status == 0){
      alertify.alert("Data added.");
    }
    if(jqXHR.status == 401){
      alertify.alert("Data added");
    }
    if(jqXHR.status == 404){
      alertify.alert("Data not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" It remains to fill some field or any incorrect.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" It already exists.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No exite the parameter to edit.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Internal error.");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR,data){

    $("#tabla").slideUp();
    $("#formulario2").slideDown();
    $("#tituloFormulario").text("Editar dato:");
    //$("#nav li").removeClass("active");
    //$("#botonEditarDato").addClass("active");
    $("#pais").val(country);
    $("#pais").prop('disabled', false);
    $("#anno").val(year);
    $("#anno").prop('disabled', false);

  });
  var r= $("#pais").val()
  var y= $("#anno").val()
  var a= $("#primaryEducation").val()
  var m= $("#secondaryEducation").val()
  var w= $("#tertiaryEducation").val()
  var datos='{"country":"'+r+'","year":"'+y+'","primaryEducation":"'+a+'","secondaryEducation":"'+m+'","tertiaryEducation":"'+w+'"}';
  var metodo = "PUT";
  var url = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+country+'/'+year+'?apikey='+$("#apikey").val();
    var request2 = $.ajax({
    url: url,
    type: metodo,
    data: '{}',
    contentType: "application/json"
  });

  busqueda();

}

function paginacion() {
     var x = document.getElementById("limit").value;
     var busqueda= document.getElementById("busqueda").value;


    $.ajax(
    {
        type: "GET",
        url: 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+'0',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,

        success: function (data) {
          $("#tabla tbody tr").remove();

          var trHTML = '';

      $.each(data, function (i, item) {
        console.log(data[i]);
          trHTML +="<tr class='info'><td>" + data[i].country + '</td><td>' + data[i].year + '</td><td>' + data[i].primaryEducation + '</td><td>' + data[i].secondaryEducation + '</td><td>' + data[i].tertiaryEducation + '</td></tr>';
      });

      $('#tablaid').append(trHTML);



        },

        error: function(jqXHR,status){
          console
          if(jqXHR.status == 401){
              alertify.alert("Data added");
          }
          if(jqXHR.status == 404){
              alertify.alert("No results found");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+" Internal Server Error");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);

        }
    });
}

function paginacion2() {
var x = document.getElementById("limit").value;
var x2 = document.getElementById("pag").value;
//si x2=0 -> x3=0 (x2*x)
//si x2=1 -> x3=x1 (pag*limit -1)
//si x2=2 -> x3=
var x3= (x*x2);
var busqueda= document.getElementById("busqueda").value;
    $.ajax(
    {
        type: "GET",
        url: 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+x3,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,

        success: function (data) {
          $("#tabla tbody tr").remove();

          var trHTML = '';




      $.each(data, function (i, item) {
        console.log(data[i]);

            trHTML +="<tr class='info'><td>" + data[i].country + '</td><td>' + data[i].year + '</td><td>' + data[i].primaryEducation + '</td><td>' + data[i].secondaryEducation + '</td><td>' + data[i].tertiaryEducation + '</td></tr>';
      });

      $('#tablaid').append(trHTML);



        },


        error: function(jqXHR,status){
          console
          if(jqXHR.status == 401){
              alertify.alert("Data added");
          }
          if(jqXHR.status == 404){
              alertify.alert("No results found");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+" Internal error.");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);

        }
    });

}

function busqueda(){
    var busqueda = document.getElementById("busqueda").value;
    var busqueda2 = document.getElementById("busqueda2").value;
    var busqueda3 = document.getElementById("busqueda3").value;


    if(busqueda2=='' && busqueda3==''){
      urlBusqueda='http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val();
    }else if(busqueda2!='' && busqueda3=='' && busqueda!=''){
              urlBusqueda='http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val()+'&from='+busqueda2 + '&to=999999999999999999999999999999999999999999999999999999';
            }else if(busqueda2=='' && busqueda3!='' && busqueda!=''){
                    urlBusqueda='http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val()+'&from=0'+'&to='+busqueda3;
            }else if(busqueda2!='' && busqueda3!='' && busqueda!=''){
                    urlBusqueda='http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val() + '&from=' + busqueda2 + '&to=' + busqueda3;
            }else if(busqueda2!='' && busqueda3!='' && busqueda==''){
                    urlBusqueda='http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/?apikey=' + $("#apikey").val() + '&from=' + busqueda2 + '&to=' + busqueda3;
            }else if(busqueda2=='' && busqueda3!='' && busqueda==''){
                    urlBusqueda='http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/?apikey=' + $("#apikey").val() + '&from=0'+  '&to=' + busqueda3;
            }else if (busqueda2!='' && busqueda3=='' && busqueda==''){
                    urlBusqueda='http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/?apikey=' + $("#apikey").val() + '&from=' + busqueda2 + '&to=999999999999999999999999999999999999999999999999999999';
            }



    $.ajax(
    {
        type: "GET",
        url: urlBusqueda,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
          $("#tablaid tbody tr").remove();
          var trHTML = '';
          $.each(data, function (i, item) {
          console.log(data[i]);
          trHTML += "<tr class='info'><td>" + data[i].country + '</td><td>' + data[i].year + '</td><td>' + data[i].primaryEducation + '</td><td>' + data[i].secondaryEducation + '</td><td>' + data[i].tertiaryEducation + '</td></tr>';
      });

      $('#tablaid').append(trHTML);



        },


        error: function(jqXHR,status){
          console
          if(jqXHR.status == 401){
              alertify.alert("Data added");
          }
          if(jqXHR.status == 404){
              alertify.alert("No results found");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+" Internal erroro.");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);

        }
    });
}
