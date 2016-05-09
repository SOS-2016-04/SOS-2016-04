google.charts.load('current', {'packages':['geochart']});



$(document).ready(()=>{
    var request = $.ajax({
      url: 'https://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education?apikey=clave',
      type: "GET",
      data: "{}",
      contentType: "application/json",
      dataType: "json"
    });


    request.done((dataFromServer,status)=>{
        google.charts.setOnLoadCallback(drawChart);
        Array.prototype.unique=function(a){
          return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
        });

        function drawChart() {


          /* dataForWidget = dataFromServer*/

          console.log(dataFromServer);
          var dataForWidget = [ ];
          var regions = ['Years'];
          var years = [];

          for(i=0;i<dataFromServer.length;i++){
            var item = dataFromServer[i];
            countrys.push(item.country);
            years.push(item.year);

            //var itemForWidget = [];
            //dataForWidget.push(itemForWidget);
          }
            contrys = countrys.unique();
            years = years.unique();
            dataForWidget.push(contrys);
            console.log(contrys);



            console.log(years);
          for(j=0;j<years.length;j++){
            var a= [];
            a.push(years[j]);


            for(j2=1;j2<contrys.length;j2++){
              var aux=false;
              for(i=0;i<dataFromServer.length;i++){
                var item = dataFromServer[i];
                if(item.contry==regions[j2] && item.year==years[j]){
                  a.push(item.primaryEducation);
                  aux=true;
                }
              }
              if(aux==false){
                a.push(0);
              }


            }
            console.log(a);
            dataForWidget.push(a);
          }




          //console.log(dataForWidget);

          var data = google.visualization.arrayToDataTable(dataForWidget);

          var options = {
            chart: {
              title: 'population-labor-force-percentage-by-education',
              subtitle: 'Population labor force percentage by education',
            },
            bars: 'horizontal' // Required for Material Bar Charts.
          };

          var chart = new google.charts.Bar(document.getElementById('educationDiv'));
          chart.draw(data, options);
        }



    });


});
