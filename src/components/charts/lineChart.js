import React, { Component } from "react";
import Chart from "chart.js";

export default class LineChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    this.chartRef.current.style.backgroundColor='#f6fbfc'
    const yLabel = this.props.yLabel || 'AMOUNT'
    const xLabel = this.props.xLabel || "SALES DAYS"
    const unit = this.props.unit || ''

    new Chart(myChartRef, {
      type: "line",
      data: this.props.data,
      responsive: true,
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            },
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: xLabel,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: yLabel,
              },
              ticks: {
                callback: function(value, index, values) {
                  return value+unit
                }
              }
            },
          ],
        },
      },
    });
  }
  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
