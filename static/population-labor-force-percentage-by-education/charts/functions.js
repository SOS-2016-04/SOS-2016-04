google.charts.load('current', {'packages':['geochart']});

$(document).ready(function(){
    console.log("jQuery ready!");
    jQuery.support.cors = true;

    var request=$.ajax({
        type: "GET",
        url: '../../api/v1/spain-births?apikey=read',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });
      request.done(function(dataFromServer,status){

        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
          console.log(dataFromServer);
          var dataForWidget=[["Region","Total birth"]];

        //Tranformación
        for(i=0;i<dataFromServer.length;i++){
          item=dataFromServer[i];
          console.log(item);
          var itemForWidget=[item.region,item.totalbirth];
          dataForWidget.push(itemForWidget);
        }
          console.log(dataForWidget);
          var data = google.visualization.arrayToDataTable(dataForWidget);
          console.log("Success!");

  var options = {
    region: 'ES',
    displayMode: 'markers',
    colorAxis: {colors: ['green', 'blue']}
  };


  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}
});

});
