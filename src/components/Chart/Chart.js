import React from 'react';
import CanvasJSReact from "../../canvasjs.stock.react";
import "./Chart.css";

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const Chart = ({ symbol, openPrices, highPrices, lowPrices, closePrices, volumes, timeData }) => {
    
    let myPriceData = timeData.map((item, index) => {
        return {x: new Date(item), y: [parseFloat(openPrices[index]), parseFloat(highPrices[index]), parseFloat(lowPrices[index]), parseFloat(closePrices[index])], color: parseFloat(openPrices[index]) < parseFloat(closePrices[index]) ? "green" : "red" };
    });

    let myVolumeData = timeData.map((item, index) => {
      return {x: new Date(item), y: parseFloat(volumes[index]), color: parseFloat(openPrices[index]) < parseFloat(closePrices[index]) ? "green" : "red"  };
    });

    let myCloseData = timeData.map((item, index) => {
      return {x: new Date(item), y: parseFloat(closePrices[index])};
  });
    
    const options = {
        theme: "dark2",
        title: {
            text: symbol
        },
        charts: [{
            toolTip: {
              shared: true
            },
            axisX: {
              margin: 10,
              lineThickness: 5,
              tickLength: 0,
              labelFormatter: function(e) {
                return "";
              },
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                  return ""
                }
              }
            },
            axisY2: {
              title: `${symbol} price`,
              prefix: "$"
            },
            legend: {
              verticalAlign: "top",
              horizontalAlign: "left"
            },
            data: [{
              name: "Price (in USD)",
              type: "candlestick",
              yValueFormatString: "$#,###.##",
              axisYType: "secondary",
              risingColor: "green",
              fallingColor: "red",
              dataPoints: myPriceData
           }]
        },{
          height: 100,
          toolTip: {
          shared: true
        },
          axisX: {
            margin: 10,
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY2: {
            title: "Volume"
          },
          legend: {
            horizontalAlign: "left"
          },
          data: [{
            yValueFormatString: "#,###.##",
            axisYType: "secondary",
            name: "Volume",
            dataPoints : myVolumeData
          }]
        }],
        navigator: {
          data: [{
            color: "grey",
            type: "area",
            dataPoints: myCloseData
          }],
          slider: {
            minimum: new Date(timeData.reduce((a,b) => a < b ? a : b, "2030-01-01")),
            maximum: new Date(timeData.reduce((a,b) => a > b ? a : b, "1900-01-01"))
          },
          axisX: {
            labelFontColor: "white"
          }
        }
      };
      const containerProps = {
        width: "64vw",
        height: "48vh",
        margin: "auto",
        
      };
      return (
        <div>
          <CanvasJSStockChart
            options={options}
            containerProps = {containerProps}
            // onRef={ref => this.stockChart = ref}
          />
        </div>
      );
    
}

export default Chart
