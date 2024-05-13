import React, { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
import ReactApexChart from "react-apexcharts";
import { Info } from "react-feather";
const GenderGraph = () => {
  const chartData = {
    series: [58, 42],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      colors: ["#EBF1FC", "#1264FD"],
      states: {
        hover: {
          filter: {
            type: "none", // Disable hover effect
          },
        },
      },
      labels: ["Male", "Female"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        show: false, // This will hide the legend
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opts) {
          return opts.w.config.labels[opts.seriesIndex] + val + "%"; // Display label and value with a line break
        },
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "16px",
          fontWeight: 100,
          colors: ["#000000", "#ffffff"], // Define colors for Male and Female respectively
        },
        dropShadow: {
          enabled: false, // Remove shadow
        },
      },
    },
  };
  return (
    <Fragment>
      <Card style={{ height: "90%" }}>
        <CardBody style={{ padding: "20px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 400,
              position: "relative",
              width: "100%",
              color: "#595959",
            }}
          >
            Gender
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "13%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
          </p>
          <div className="mt-5">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="pie"
              height={250}
            />
          </div>
          <div className="mt-5">
            <div className="pb-2">
              <span
                class="badge"
                style={{ color: "#EBF1FC", backgroundColor: "#EBF1FC" }}
              >
                .
              </span>
              <span
                className="ms-2"
                style={{ fontSize: "12px", fontWeight: 400, color: "#595959" }}
              >
                Male Candidates
              </span>
              <span className="ms-1">
                <Info color="#8FA8D7" strokeWidth={2} size={10} />
              </span>
            </div>
            <div className="pb-2">
              <span
                class="badge"
                style={{ color: "#1264FD", backgroundColor: "#1264FD" }}
              >
                .
              </span>
              <span
                className="ms-2"
                style={{ fontSize: "12px", fontWeight: 400, color: "#595959" }}
              >
                Female Candidates
              </span>
              <span className="ms-1">
                <Info color="#8FA8D7" strokeWidth={2} size={10} />
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default GenderGraph;
