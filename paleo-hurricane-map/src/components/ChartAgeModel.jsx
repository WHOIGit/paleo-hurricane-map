import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";
import Typography from "@mui/material/Typography";
import HighchartsReact from "highcharts-react-official";
// need to add this extra window variable declaration
// Highcharts has internal references that rely on it being defined on the window
window.Highcharts = Highcharts;

export default function ChartAgeModel({ data }) {
  const [chartOptions, setChartOptions] = useState({});
  const [showChart, setShowChart] = useState(true);

  const chartRef = useRef();
  console.log(chartRef.current?.chart);
  useEffect(() => {
    const chartData = data
      .filter((item) => item.depth && item.median_age)
      .map((item) => [item.depth, item.median_age]);
    const chartData2 = data
      .filter((item) => item.depth && item.min_age)
      .map((item) => [item.depth, item.min_age]);
    const chartData3 = data
      .filter((item) => item.depth && item.max_age)
      .map((item) => [item.depth, item.max_age]);

    if (!chartData.length && !chartData2.length && !chartData3.length) {
      setShowChart(false);
    }

    const chartOptions = {
      chart: {
        type: "spline",
      },
      title: {
        text: "Age Model",
      },
      xAxis: {
        //offset: -110,
        title: {
          enabled: true,
          text: "Depth (cm)",
        },
      },
      yAxis: {
        offset: 0,
        title: {
          text: "Age",
        },
      },
      legend: {
        enabled: true,
      },
      tooltip: {
        formatter: function () {
          const text = `
            <b>${this.series.name}</b>: ${this.y} age<br/><b>Depth</b>: ${this.x} cm
        `;
          return text;
        },
      },
      plotOptions: {
        spline: {
          marker: {
            enable: false,
          },
        },
      },
      series: [
        {
          name: "Median Age",
          data: chartData,
        },
        {
          name: "Min Age",
          data: chartData2,
        },
        {
          name: "Max Age",
          data: chartData3,
        },
      ],
    };
    setChartOptions(chartOptions);
  }, [data]);

  /*
  useEffect(() => {
    if (chartRef.current) {
      console.log("Setting axis");
      let yAxisOffset = chartRef.current.chart.xAxis[0].toPixels(0, true) * -1;
      let xAxisOffset = chartRef.current.chart.yAxis[0].toPixels(0, true) * -1;
      console.log(xAxisOffset, yAxisOffset);

      chartRef.current.chart.xAxis[0].update(
        {
          offset: xAxisOffset,
        },
        true
      );
    }
  }, [chartRef.current]);
  */

  if (showChart) {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
    );
  } else {
    return (
      <Typography variant="body1" gutterBottom>
        Chart not available for this Data Site.
      </Typography>
    );
  }
}
