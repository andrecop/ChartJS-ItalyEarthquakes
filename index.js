//=============================================================================
//                   Andrea Coppetta - Matricola: 873849
//           Cartina Terremoti Italia v1.0 - Assignment 3 - Chart.js
//         Corso: [CT0178] LINGUAGGI PER LA RETE (CT3) - a.a. 2020-21
//=============================================================================
//                              *** CHANGELOG ***
//=============================================================================
// (v1.0) - Creata mappa con terremoti di 3 magnitudo diverse
//=============================================================================

// NOTE - risoluzione consigliata: 500x600

$(document).ready(function() {

    var ctx = $("#myChart");  
    
    var bubble = new Chart(ctx,
                          {
                    type:"bubble",
                    data:{
                        datasets:[
                            {
                                label: [],
                                data: [],
                                title: "dataTitle1",
                                "backgroundColor":"rgb(255, 0, 0, 0.3)",
                                "borderColor":"red",
                                borderWidth: 1
                            },
                            {
                                label: [],
                                data: [],
                                title: "dataTitle2",
                                "backgroundColor":"rgb(255, 128, 0, 0.3)",
                                "borderColor":"orange",
                                borderWidth: 1
                            },
                            {
                                label: [],
                                data: [],
                                title: "dataTitle3",
                                "backgroundColor":"rgb(0, 255, 0, 0.3)",
                                "borderColor":"green",
                                borderWidth: 1
                            }
                        ]
                    },
                    options:{
                        responsive: true,
                        scales:{
                            yAxes:[{
                                //display: false,
                                ticks:{
                                    max: 47.7,
                                    min: 36
                                }
                            }],
                            xAxes:[{
                                //display: false,
                                ticks:{
                                    max: 19.5,
                                    min: 5.5
                                }
                            }]
                        },
                        maintainAspectRatio: false,
                        tooltips: {
                            callbacks: {
                               label: function(t, d) {
                                    var magnitudo = d.datasets[t.datasetIndex].data[t.index].r/4;
                                    var data = d.datasets[t.datasetIndex].data[t.index].d;
                                  return d.datasets[t.datasetIndex].label[t.index] + 
                                         ': (Lat:' + t.xLabel + ', Lng:' + t.yLabel + ', Magnitudo:' + magnitudo + ", Data:" + data + ')';
                               }
                            }
                         }
                    }
    })
    
    var nomiCittaMwForte = ["L'Aquila (AQ)", "Norcia (PG)"];
    var terremotiMwForte = [{"x": 12.84, "y": 43.14, "r": 24.4, "d": "06/04/2009"}, {"x": 13.81, "y": 42.13, "r": 26, "d": "30/10/2016"}];

    var nomiCittaMwMedio = ["Milo (CT)", "Vigasio (VR)"];
    var terremotiMwMedio = [{"x": 15.05, "y": 37.05, "r": 12.8, "d": "28/10/2020"}, {"x": 11.23, "y": 45.87, "r": 12.6, "d": "07/12/2019"}];

    var nomiCittaMwDebole = ["Posta (RI)", "Accumoli (RI)"];
    var terremotiMwDebole = [{"x": 12.57, "y": 42.16, "r": 4.8, "d": "02/10/2010"}, {"x": 12.25, "y": 42.23, "r": 3.2, "d": "18/10/2016"}];
    
    
    function addData(chart, label, data, datasetIndex){
        for(var i=0; i<data.length; i++){
            setTimeout(function(i){ 
                var l = label[i];
                var d = data[i];
                console.log("timeout index i: "+i+ " aggiungo bolla")
                chart.data.labels.push("l");
                chart.data.datasets[datasetIndex].label.push(l);
                chart.data.datasets[datasetIndex].data.push(d);
                chart.update();
            }, (i+2)*1000, i, data[i]);
        }
    }

    addData(bubble, nomiCittaMwForte, terremotiMwForte, 0);

    setTimeout(function(){ 
        addData(bubble, nomiCittaMwMedio, terremotiMwMedio, 1)
    }, 2*1000);

    setTimeout(function(){ 
        addData(bubble, nomiCittaMwDebole, terremotiMwDebole, 2)
    }, 4*1000);


    
});