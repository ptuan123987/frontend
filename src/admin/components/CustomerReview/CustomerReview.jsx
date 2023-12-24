import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const CustomerReview = () => {
  const [seriesData, setSeriesData] = useState([
    {
      name: "Review",
      data: [10, 50, 30, 90, 40, 20, 30,10,20,19],
    },
  ]);


  const updateSeriesData = () => {
    const smallChange = () => (Math.random() > 0.5 ? 10 : -10);
  
    const newSeriesData = {
      name: "Review",
      data: seriesData[0].data.map((value) => value + smallChange()),
    };
  
    setSeriesData([newSeriesData]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateSeriesData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []); 

  const data = {
    series: seriesData,
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2023-12-25T00:00:00.000Z",
          "2023-12-25T01:30:00.000Z",
          "2023-12-25T02:30:00.000Z",
          "2023-12-25T03:30:00.000Z",
          "2023-12-25T04:30:00.000Z",
          "2023-12-25T05:30:00.000Z",
          "2023-12-25T06:30:00.000Z",
          "2023-12-25T07:30:00.000Z",
          "2023-12-25T08:30:00.000Z",
          "2023-12-25T09:30:00.000Z",
          "2023-12-25T010:30:00.000Z",
          "2023-12-25T011:30:00.000Z",
          "2023-12-25T012:30:00.000Z",
        ],
      },
      yaxis: {
        show: false,
      },
      toolbar: {
        show: false,
      },
    },
  };

  return (
    <div className="CustomerReview">
      <Chart options={data.options} series={data.series} type="area" />
    </div>
  );
};

export default CustomerReview;
