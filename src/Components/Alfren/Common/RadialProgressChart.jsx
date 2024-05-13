import React from "react";
import ReactApexChart from "react-apexcharts";
import { WidgetsRadialChart } from "../../../Data/Crypto/Chart";

const RadialProgressChart = ({ chartOption, chartHeight }) => {
  return (
    <ReactApexChart
      type="radialBar"
      height={chartHeight}
      series={chartOption.series}
      options={chartOption.options}
    />
  );
};

export default RadialProgressChart;
