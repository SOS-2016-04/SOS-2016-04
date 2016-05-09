google.charts.load('current', {'packages':['geochart']});

$(document).ready(function(){

    var request=$.ajax({
        type: "GET",
        url: 'https://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education?apikey=clave',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });
      request.done(function(dataFromServer,status){

        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
          console.log(dataFromServer);
          var dataForWidget=[["country","tertiaryEducation"]];

        //Tranformación
        for(i=0;i<dataFromServer.length;i++){
          item=dataFromServer[i];
          console.log(item);
          var itemForWidget=[item.country,item.tertiaryEducation];
          dataForWidget.push(itemForWidget);
        }
          console.log(dataForWidget);
          var data = google.visualization.arrayToDataTable(dataForWidget);
          console.log("Success!");

  var options = {};


  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}
});

});
