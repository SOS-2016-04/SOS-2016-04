function mostrar(apikey){
  $.ajax(
    {
      type: "GET",
      url:"/api/v1/population-unemployed-percentage-by-gender?apikey="+apikey,
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      cache: false,
      success: function (data) {
        var trHTML = '';
      $.each(data, function (i, item) {
        trHTML += '<thead><tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.female + '</td><td>' + item.male + '</td></tr></thead>';
      });
      $('#tabla').append(trHTML);
      }

       });
}

  $("#loadData").click(function(){
    $("#tabla td").remove();
      var apikey = $("#apikey").val();
      var request = $.ajax({
          url:"/api/v1/population-unemployed-percentage-by-gender/loadInitialData?apikey="+apikey,
          type:"GET",
          contentType : "application/json"
         });
          request.always(function(jqXHR,status){
              respuestas(jqXHR,status);
      });
      mostrar(apikey);
    });

/*function myFunction2() {
  document.getElementById("pag2").value = 0;
}*/
    $("#search").click(function(){
   $("#tabla td").remove();
   //myFunction2();
   var dobles_comillas = String.fromCharCode(34);
    var apikey = $("#apikey").val();
      var y = $("#year").val();
      var c = $("#country").val();
      var f = $("#from").val();
      var t = $("#to").val();
      //var pag = $("#pag").val();
    //  var pag2 = $("#pag2").val();
    if(y != ""){
      y = "/"+y;
    }
    if(c != ""){
      c= "/" + c;
    }
    if(f != ""){
      f = "&from=" + f;
    }
    if(t != ""){
      t = "&to=" + t;
    }
  /*	if(pag != ""){
      pag = "&limit=" + pag;
    }
    if(pag2 != ""){
      pag2 = "&offset=" + pag2;
    }*/
    var request = $.ajax(
    {
      type: "GET",
      url:"/api/v1/population-unemployed-percentage-by-gender"+c+y+"?apikey="+apikey + f + t, //+ pag2 + pag,
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      cache: false,
      success: function (data) {
        var trHTML = '';
      $.each(data, function (i, item) {
        trHTML += '<thead><tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.female + '</td><td>' + item.male + '</td></tr></thead>';
      });
      $('#tabla').append(trHTML);
      }
       });
    request.always(function(jqXHR,status){
      respuestas(jqXHR,status);
      });
});
/*function myFunction(pag3) {
  document.getElementById("pag2").value = pag3;
}
$("#siguiente").click(function(){
   $("#location td").remove();
    var apikey = $("#apikey").val();
      var year = $("#year").val();
      var country = $("#country").val();
      var desde = $("#desde").val();
      var hasta = $("#hasta").val();
      var pag = $("#pag").val();
      var pag2 = $("#pag2").val();
      pag3 = parseInt(pag) + parseInt(pag2);
    if(year != ""){
      year = "/"+year;
    }
    if(country != ""){
      country = "/" + country;
    }
    if(desde != ""){
      desde = "&from=" + desde;
    }
    if(hasta != ""){
      hasta = "&to=" + hasta;
    }
    if(pag != ""){
      pag = "&limit=" + pag;
    }
    if(pag2 != ""){
      pag2 = "&offset=" + pag3;
    }
        var request = $.ajax(
    {
      type: "GET",
      url:"https://sos-2016-13.herokuapp.com/api/v1/consumed" + country + year + "?apikey="+apikey + desde + hasta + pag2 + pag,
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      cache: false,
      success: function (data) {
        var trHTML = '';
      $.each(data, function (i, item) {
        if(item != null){
        trHTML += '<thead><tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.petroleum_cost + '</td><td>' + item.electric_cost + '</td></tr></thead>';
        anterior.disabled = false;
      }else{
        siguiente.disabled = true;
        }
      });
      $('#location').append(trHTML);
      },
      error: function (msg) {
        alert(msg.responseText);
      }
       });
          myFunction(pag3);
    request.always(function(jqXHR,status){
      errores(jqXHR,status);
      });
});
$("#anterior").click(function(){
   $("#location td").remove();
    var apikey = $("#apikey").val();
      var year = $("#year").val();
      var country = $("#country").val();
      var desde = $("#desde").val();
      var hasta = $("#hasta").val();
      var pag = $("#pag").val();
      var pag2 = $("#pag2").val();
      pag3 = parseInt(pag2) - parseInt(pag);
    if(year != ""){
      year = "/"+year;
    }
    if(country != ""){
      country = "/" + country;
    }
    if(desde != ""){
      desde = "&from=" + desde;
    }
    if(hasta != ""){
      hasta = "&to=" + hasta;
    }
    if(pag != ""){
      pag = "&limit=" + pag;
    }
    if(pag2 != ""){
      pag2 = "&offset=" + pag3;
    }
        var request = $.ajax(
    {
      type: "GET",
      url:"https://sos-2016-13.herokuapp.com/api/v1/consumed" + country + year + "?apikey="+apikey + desde + hasta + pag2 + pag,
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      cache: false,
      success: function (data) {
        var trHTML = '';
      $.each(data, function (i, item) {
        if(item != null){
        trHTML += '<thead><tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.petroleum_cost + '</td><td>' + item.electric_cost + '</td></tr></thead>';
        siguiente.disabled = false;
        }else{
          anterior.disabled = true;
        }
      });
      $('#location').append(trHTML);
      },
      error: function (msg) {
        alert(msg.responseText);
      }
       });

        myFunction(pag3);

    request.always(function(jqXHR,status){
      errores(jqXHR,status);
      });
});*/

    $("#add").click(function(){
  $("#tabla td").remove();
      var apikey = $("#apikey").val();
      var country = $("#country").val();
      var year = $("#year").val();
      var female = $("#female").val();
      var male = $("#male").val();
          var request = $.ajax({
              url:"/api/v1/population-unemployed-percentage-by-gender?apikey="+apikey,
              type:"POST",
              data: '{"country":"'+country+'","year":'+year+',"female":'+female+',"male":'+male+'}',
              contentType : "application/json"
             });
          request.always(function(jqXHR,status){
            respuestas(jqXHR,status);
      });
      mostrar(apikey);
    });

    $("#edit").click(function(){
  $("#tabla td").remove();
      var apikey = $("#apikey").val();
      var country = $("#country").val();
      var year = $("#year").val();
      var female = $("#female").val();
      var male = $("#male").val();
      var request = $.ajax({
          url:"/api/v1/population-unemployed-percentage-by-gender/" + country + "/" + year + "?apikey="+apikey,
          type:"PUT",
          data: '{"country":"'+country+'","year":'+year+',"female":'+female+',"male":'+male+'}',
          contentType : "application/json"
         });
          request.always(function(jqXHR,status){
            respuestas(jqXHR,status);
      });
      mostrar(apikey);
    });

    $("#remove").click(function(){
  $("#tabla td").remove();
      var apikey = $("#apikey").val();
      var country = $("#country").val();
      var year = $("#year").val();
      var request = $.ajax({
          url:"/api/v1/population-unemployed-percentage-by-gender/" + country + "/" + year + "?apikey="+apikey,
          type:"DELETE",
          contentType : "application/json"
         });
          request.always(function(jqXHR,status){
            respuestas(jqXHR,status);
      });
      mostrar(apikey);
    });

  $("#removeall").click(function(){
    $("#tabla td").remove();
      var apikey = $("#apikey").val();
        var request = $.ajax({
          url:"/api/v1/population-unemployed-percentage-by-gender?apikey="+apikey,
          type:"DELETE",
          contentType : "application/json"
         });
         request.always(function(jqXHR,status){
           respuestas(jqXHR,status);
      });
         mostrar(apikey);
    });

  $("#all").click(function(){
    $("#tabla td").remove();
  var apikey = $("#apikey").val();
  var request = $.ajax(
  {
    type: "GET",
    url: '/api/v1/population-unemployed-percentage-by-gender?apikey='+apikey,
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false,
    success: function (data) {
      var trHTML = '';
    $.each(data, function (i, item) {
      trHTML += '<thead><tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.female + '</td><td>' + item.male + '</td></tr></thead>';
    });
    $('#tabla').append(trHTML);
    }

     });
      request.always(function(jqXHR,status){
      respuestas(jqXHR,status);
      });
});
function respuestas(jqXHR,status){
if(status=="error"){
        if(jqXHR.status == "401"){
          alert("Apikey incorrect");
        }else if (jqXHR.status == "409"){
          alert(" This data already exists.");
        }
      }
    };
