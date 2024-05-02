import React, { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
import ReactApexChart from "react-apexcharts";
const AvgExp = () => {
  const chartData = {
    series: [
      {
        name: "Count",
        data: [7, 4, 7, 8, 9, 4, 8, 3, 5, 9, 9, 2, 3, 6, 6, 8, 4, 2, 5, 1],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "90%",
          endingShape: "rounded",
          colors: {
            backgroundColor: "#8FA8D7",
            borderRadius: 2, // Control border radius for rounded corners
            border: {
              opacity: 1,
              width: 1,
              color: "#8FA8D7", // Match bar color for seamless appearance
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#8FA8D7"], // Change bar color
      },
      xaxis: {
        labels: {
          show: false, // Hide x-axis labels
        },
        axisBorder: {
          show: false, // Hide x-axis border
        },
        categories: [
          "1Yr",
          "2Yr",
          "3Yr",
          "4Yr",
          "5Yr",
          "6Yr",
          "7Yr",
          "8Yr",
          "9Yr",
          "10Yr",
          "11Yr",
          "12Yr",
          "13Yr",
          "14Yr",
          "15Yr",
          "16Yr",
          "17Yr",
          "18Yr",
          "19Yr",
          "20Yr",
        ],
      },
      yaxis: {
        labels: {
          show: false, // Hide y-axis labels
        },
        axisBorder: {
          show: false, // Hide y-axis border
        },
      },
      fill: {
        opacity: 1,
        colors: ["#8FA8D7"], // Change bar color
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Candidates";
          },
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
            Average Experience
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "30%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
          </p>
          <div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontWeight: 900,
                  fontSize: "100px",
                  color: "#1264FD",
                }}
              >
                3
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: "24px",
                    color: "#8D8E90",
                  }}
                >
                  Years
                </span>
              </p>
            </div>
            <div>
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={250}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default AvgExp;
