// import React, { Fragment, useEffect, useState } from "react";
// import { Card, CardBody, Progress, Col } from "reactstrap";
// import ReactApexChart from "react-apexcharts";

// const AvgExp = ({ AvgExpStatsData, avgExperience }) => {
//   console.log({ AvgExpStatsData, avgExperience });
//   const [chartData, setChartData] = useState({
//     series: [
//       {
//         name: "Count",
//         data: [], // This will be populated based on AvgExpStatsData
//       },
//     ],
//     options: {
//       chart: {
//         type: "bar",
//         height: 350,
//         toolbar: {
//           show: false,
//         },
//       },
//       grid: {
//         show: false,
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: "90%",
//           endingShape: "rounded",
//           colors: {
//             background: "#8FA8D7",
//             borderRadius: 2,
//             border: {
//               opacity: 1,
//               width: 1,
//               color: "#8FA8D7",
//             },
//           },
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         show: true,
//         width: 1,
//         colors: ["#8FA8D7"],
//       },
//       xaxis: {
//         labels: {
//           show: true,
//           rotate: 0, // Ensure labels are not rotated
//         },
//         axisBorder: {
//           show: false,
//         },
//         categories: [], // This will be populated based on AvgExpStatsData
//       },
//       yaxis: {
//         labels: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//       },
//       fill: {
//         opacity: 1,
//         colors: ["#8FA8D7"],
//       },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return val + " Candidates";
//           },
//         },
//       },
//     },
//   });

//   useEffect(() => {
//     if (AvgExpStatsData) {
//       const { category, values } = AvgExpStatsData;
//       setChartData({
//         ...chartData,
//         series: [
//           {
//             ...chartData.series[0],
//             data: values,
//           },
//         ],
//         options: {
//           ...chartData.options,
//           xaxis: {
//             ...chartData.options.xaxis,
//             categories: category.map((year) => (year ? `${year} yr` : "N/A")),
//           },
//         },
//       });
//     }
//   }, [AvgExpStatsData]);

//   return (
//     <Fragment>
//       <Card style={{ height: "90%" }}>
//         <CardBody style={{ padding: "20px" }}>
//           <p
//             style={{
//               fontSize: "12px",
//               fontWeight: 400,
//               position: "relative",
//               width: "100%",
//               color: "#595959",
//             }}
//           >
//             Average Experience
//             <span
//               style={{
//                 position: "absolute",
//                 bottom: "0",
//                 left: "0",
//                 width: "30%",
//                 borderBottom: "1px solid #1264FD",
//               }}
//             ></span>
//           </p>
//           <div>
//             <div style={{ textAlign: "center" }}>
//               {/* Static display of average years */}
//               <p
//                 style={{
//                   fontWeight: 900,
//                   fontSize: "100px",
//                   color: "#1264FD",
//                 }}
//               >
//                 {avgExperience}
//                 <span
//                   style={{
//                     fontWeight: 500,
//                     fontSize: "24px",
//                     color: "#8D8E90",
//                   }}
//                 >
//                   Years
//                 </span>
//               </p>
//             </div>
//             <div>
//               {/* ApexCharts bar chart */}
//               <ReactApexChart
//                 options={chartData.options}
//                 series={chartData.series}
//                 type="bar"
//                 height={250}
//               />
//             </div>
//           </div>
//         </CardBody>
//       </Card>
//     </Fragment>
//   );
// };

// export default AvgExp;

import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

const AvgExp = ({ AvgExpStatsData, avgExperience = 0, isLoading = false }) => {
  const [chartData, setChartData] = useState({
    series: [{
      name: "Candidates",
      data: []
    }],
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false }
      },
      colors: ['#1264FD'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '70%'
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: '#8D8E90'
          }
        }
      },
      yaxis: { show: false },
      grid: { show: false }
    }
  });

  useEffect(() => {
    if (AvgExpStatsData?.category && AvgExpStatsData?.values) {
      setChartData({
        series: [{
          name: "Candidates",
          data: AvgExpStatsData.values
        }],
        options: {
          ...chartData.options,
          xaxis: {
            ...chartData.options.xaxis,
            categories: AvgExpStatsData.category.map(year => 
              year === 0 ? '<1 yr' : `${year} yr${year > 1 ? 's' : ''}`
            )
          }
        }
      });
    }
  }, [AvgExpStatsData]);

  if (isLoading) {
    return (
      <Card>
        <CardBody className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <h5 className="mb-3">Experience Distribution</h5>
        
        <div className="text-center mb-4">
          <h1 style={{ color: '#1264FD', fontSize: '72px' }}>
            {avgExperience.toFixed(1)}
            <span style={{ fontSize: '24px', color: '#8D8E90' }}> years</span>
          </h1>
        </div>

        {chartData.series[0].data.length > 0 ? (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={300}
          />
        ) : (
          <p className="text-center text-muted">No data available</p>
        )}
      </CardBody>
    </Card>
  );
};

AvgExp.propTypes = {
  AvgExpStatsData: PropTypes.shape({
    category: PropTypes.arrayOf(PropTypes.number),
    values: PropTypes.arrayOf(PropTypes.number)
  }),
  avgExperience: PropTypes.number,
  isLoading: PropTypes.bool
};

AvgExp.defaultProps = {
  avgExperience: 0,
  isLoading: false
};

export default AvgExp;