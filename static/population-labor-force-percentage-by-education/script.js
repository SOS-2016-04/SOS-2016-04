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
      var url = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education'+$("#pais").val()+'/'+$("#anno").val()+'?apikey='+$("#apikey").val();
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
  console.log("¿Es un nuevo Dato?: "+nuevoDato);
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
    alertify.alert("No has seleccionado ningún dato");
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
    alertify.confirm("¿Quieres eliminar el dato?", function (e) {
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

function botonEliminarTodo(){

  var x;

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
    alertify.alert("Datos cargados con éxito. Pulsa aceptar para recargar la página.", function () {
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
      alertify.alert("Datos cargados con éxito. Pulsa aceptar para recargar la página.", function () {
      location.reload();
  });
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún parámetro para rellenar o el tipo esta mal.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" La entrada ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" NO coincide el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno del Servidor");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}

function cargaInicial(){
  var urlstring = 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education/loadInitialData?apikey=' + $("#apikey").val();
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

    alertify.confirm("¿Quiere eliminar el dato?", function (e) {
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
  var url = 'http://sos-2016-04.herokuapp.com//api/v1/population-labor-force-percentage-by-education/'+country+'/'+year+'?apikey='+$("#apikey").val();
    var request2 = $.ajax({
    url: url,
    type: metodo,
    data: '{}',
    contentType: "application/json"
  });

}
