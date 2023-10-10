import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// need to add this extra window variable declaration
// Highcharts has internal references that rely on it being defined on the window
window.Highcharts = Highcharts;

export default function ChartDepth({ data, yAxisLabel }) {
  console.log(data);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const chartData = data.map((item) => [item.depth, item.sand]);
    console.log(chartData);
    const chartOptions = {
      chart: {
        type: "spline",
        zoomType: "x",
      },
      title: {
        text: null,
      },
      xAxis: {
        title: {
          enabled: true,
          text: "Depth (cm)",
        },
      },
      yAxis: {
        title: {
          text: yAxisLabel,
        },
        min: 0,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          const text = `
            <b>${this.series.name}</b>: ${this.y}<br/><b>Depth (cm)</b>: ${this.x}
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
          name: yAxisLabel,
          data: chartData,
        },
      ],
    };
    setChartOptions(chartOptions);
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
