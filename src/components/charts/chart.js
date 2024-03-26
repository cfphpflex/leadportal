import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";

Chart.pluginService.register({
  beforeDraw: function (chart, easing) {
    if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
      var helpers = Chart.helpers;
      var ctx = chart.chart.ctx;
      var chartArea = chart.chartArea;

      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    }
  }
});

const height=289

export default function TheChart(props) {
  const chartRef=useRef(null)
  const [chartJSReference, setChartJSReference] = useState(null)

  const previousData = usePrevious(props.data)

  useEffect(()=>{

    const oldLength = previousData && previousData.labels.length
    const newLength = props.data.labels.length
    if(oldLength===newLength) return

    if(chartJSReference){
      chartJSReference.destroy()
    }

    const myChartRef = chartRef.current.getContext("2d");
    
    const yLabel = props.yLabel || 'AMOUNT'
    const xLabel = props.xLabel || "TREATMENT DAYS"
    const unit = props.unit || ''
    const type = props.type || 'line'
    const color = props.color || '#0a99b8'

    const theReference = new Chart(myChartRef, {
      type: type,
      data: props.data,
      responsive: true,
      options: {
        onClick:(e,elements)=>{
          const el = elements[0]
          if(props.onClick) props.onClick(el)
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
             top: 25  //set that fits the best
          }
        },
        chartArea: {
          backgroundColor: '#f6fbfc'
        },
        legend: {
          display: false,
        },
        tooltips: {
          yAlign:'bottom',
          xAlign:'center',
          yPadding:12,
          xPadding:6,
          bodyFontSize:18,
          bodyAlign:'center',
          custom: function(tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
            tooltip.backgroundColor = color
          },
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel+unit;
            },
            title: function(tooltipItems) {
              return '' // no title
            }
          },
        },
        scales: {
          xAxes: [
            {
              barThickness: 12,
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
    setChartJSReference(theReference)

  },[props.data])
  return (
    <div>
      <canvas id="myChart" ref={chartRef} style={{height}}/>
    </div>
  )
}

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

