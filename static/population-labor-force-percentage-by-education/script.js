var seleccionado = false;
var nuevoDato = true;


function cargaInicial(){
  var urlstring = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/loadInitialData?apikey=' + $("#apikey").val();
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
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno del Servidor");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR) {
    console.log("Datos cargados");
    alertify.alert("Datos cargados con éxito.", function () {
      location.reload();
  });
  });

}

function procesarDatos(){

  var dato = [];
  var res = [];


  var request = $.ajax({
    url: '/api/v1/population-labor-force-percentage-by-education?apikey=clave',
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
  return res;
}

function IniciarTabla(){

  var datos = "";

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


function botonEliminarTodo(){

  var x;

    var urlstring = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education?apikey=' + $("#apikey").val();
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

    console.log("Datos borrado");
    request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Dato añadidos");
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún campo por rellenar o alguno es incorrecto.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" Ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No exite el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });

}

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
      var url = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education?apikey=' + $("#apikey").val();
      solicitudAjax(metodo, url, datos);

    }else{
      console.log("Metodo PUT");
      var metodo = "PUT";
      var url = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+$("#pais").val()+'/'+$("#anno").val()+'?apikey='+$("#apikey").val();
      solicitudAjax(metodo, url, datos);
    }
}

function botonEliminarDato(){
  if(seleccionado){
      var table =  $('#tablaid').DataTable();
      console.log(table);
      var campos = conseguirDato();
      var urlstring = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+'/'+campos[0]+'/'+campos[1]+'?apikey=' + $("#apikey").val();
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
  request.success(function(status,jqXHR){
  var x;
  if(seleccionado){
    alertify.confirm("¿Quieres eliminar el dato?", function (e) {
        if (e) {
      var table =  $('#tablaid').DataTable();
      console.log(x);
      var campos = conseguirDato();
      var urlstring = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+'/'+campos[0]+'/'+campos[1]+'?apikey=' + $("#apikey").val();
      console.log(urlstring);
      table.row('.selected').remove().draw( false );
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
      seleccionado = false;
      x = "Aceptado";
      alertify.alert("Dato borrado.");
        }else{
      x = "Cancelado";
        }});
  }else{
    alertify.alert("Seleccione algún dato.");
  }
  console.log(x);
  //console.log("Dato borrado");
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Dato añadido.");
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún campo por rellenar o alguno es incorrecto.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" Ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No exite el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno.");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}else{
  alertify.alert("Seleccione algún dato.");
}
}


function eliminardato(){
  var country = document.getElementById("pai").value;
  var year = document.getElementById("ann").value;

  if(country!='' && year!=''){
      var table =  $('#tablaid').DataTable();

      var urlstring = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+'/'+country+'/'+year+'?apikey=' + $("#apikey").val();
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
  request.success(function(status,jqXHR){
  var x;

    alertify.confirm("¿Quiere eliminar el dato?", function (e) {
        if (e) {
      var table =  $('#tablaid').DataTable();
      console.log(x);

      var urlstring = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+'/'+country+'/'+year+'?apikey=' + $("#apikey").val();
      console.log(urlstring);
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
      seleccionado = false;
      x = "Aceptado";
      alertify.alert("Dato borrado.", function(){
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
      alertify.alert("Dato añadido.");
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún campo por rellenar o alguno es incorrecto.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" Ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No exite el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno.");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}else{
  alertify.alert("Seleccione algún dato.");
}

}

function editardato(){
    var country = document.getElementById("pai2").value;
    var year = document.getElementById("ann2").value;
    nuevoDato = false;
    console.log("¿El dato es nuevo?: "+nuevoDato);



  var metodo = "GET";
  var url = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+country+'/'+year+'?apikey='+$("#apikey").val();
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
      alertify.alert("Dato añadido.");
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún campo por rellenar o alguno es incorrecto.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" Ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" No exite el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno.");
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
    $("#pais").val(region);
    $("#pais").prop('disabled', true);
    $("#anno").val(year);
    $("#anno").prop('disabled', true);

  });
  var r= $("#pais").val()
  var y= $("#anno").val()
  var a= $("#primaryEducation").val()
  var m= $("#secondaryEducation").val()
  var w= $("#tertiaryEducation").val()
  var datos='{"country":"'+r+'","year":"'+y+'","primaryEducation":"'+a+'","secondaryEducation":"'+m+'","tertiaryEducation":"'+w+'"}';
  var metodo = "PUT";
  var url = 'sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/'+country+'/'+year+'?apikey='+$("#apikey").val();
    var request2 = $.ajax({
    url: url,
    type: metodo,
    data: '{}',
    contentType: "application/json"
  });

}



function busqueda(){
    var busqueda = document.getElementById("busqueda").value;


    $.ajax(
    {
        type: "GET",
        url: '/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val() ,
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
              alertify.alert("La clave introducida no es correcta");
          }
          if(jqXHR.status == 404){
              alertify.alert("No se encontraron resultados");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+" Error internoo.");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);

        }
    });
}





function paginacion() {
     var x = document.getElementById("limit").value;
     var busqueda= document.getElementById("busqueda").value;

    $.ajax(
    {
        type: "GET",
        url: '/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+'0',
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

      $('#tablaid').append(trHTML);



        },

        error: function(jqXHR,status){
          console
          if(jqXHR.status == 401){
              alertify.alert("La clave introducida no es correcta");
          }
          if(jqXHR.status == 404){
              alertify.alert("No se encontraron resultados");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+" Error interno.");
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
        url: '/api/v1/population-labor-force-percentage-by-education/'+busqueda+'?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+x3,
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
              alertify.alert("La clave introducida no es correcta");
          }
          if(jqXHR.status == 404){
              alertify.alert("No se encontraron resultados");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+" Error interno.");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);

        }
    });



}
