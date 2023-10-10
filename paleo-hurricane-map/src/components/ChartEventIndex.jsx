import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// need to add this extra window variable declaration
// Highcharts has internal references that rely on it being defined on the window
window.Highcharts = Highcharts;

export default function ChartEventIndex({ data }) {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const chartData = data
      .filter((item) => item.event_index)
      .map((item) => [item.median_age, item.event_index]);
    console.log(chartData);
    const chartOptions = {
      chart: {
        type: "scatter",
      },
      title: {
        text: "Years of events",
      },
      xAxis: {
        offset: 0,
        title: {
          enabled: true,
          text: "Year",
        },
      },
      yAxis: {
        //offset: -135,
        lineWidth: 1,
        lineColor: "black",
        min: 0,
        title: {
          text: "Event",
        },
        tickInterval: 2,
        labels: {
          enabled: false,
          formatter: function () {
            return this.value;
          },
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          const text = `
            <b>Event age: ${this.x}
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
          data: chartData,
        },
      ],
    };
    setChartOptions(chartOptions);
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
