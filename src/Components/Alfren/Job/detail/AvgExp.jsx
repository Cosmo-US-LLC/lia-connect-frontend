import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Progress, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";

const AvgExp = ({ AvgExpStatsData,avgExperience }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Count",
        data: [], // This will be populated based on AvgExpStatsData
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
            background: "#8FA8D7",
            borderRadius: 2,
            border: {
              opacity: 1,
              width: 1,
              color: "#8FA8D7",
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
        colors: ["#8FA8D7"],
      },
      xaxis: {
        labels: {
          show: true,
          rotate: 0, // Ensure labels are not rotated
        },
        axisBorder: {
          show: false,
        },
        categories: [], // This will be populated based on AvgExpStatsData
      },
      yaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
        colors: ["#8FA8D7"],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Candidates";
          },
        },
      },
    },
  });

  useEffect(() => {
    if (AvgExpStatsData) {
      const { category, values } = AvgExpStatsData;
      setChartData({
        ...chartData,
        series: [
          {
            ...chartData.series[0],
            data: values,
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            ...chartData.options.xaxis,
            categories: category.map(year => year ? `${year} yr` : "N/A"),
          },
        },
      });
    }
  }, [AvgExpStatsData]);

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
              {/* Static display of average years */}
              <p
                style={{
                  fontWeight: 900,
                  fontSize: "100px",
                  color: "#1264FD",
                }}
              >
                {avgExperience}
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
              {/* ApexCharts bar chart */}
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
