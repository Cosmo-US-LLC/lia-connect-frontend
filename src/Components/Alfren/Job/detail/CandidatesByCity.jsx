import React, { useLayoutEffect, useRef, Fragment } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Card, CardBody, Col, Progress } from "reactstrap";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import * as am5xy from "@amcharts/amcharts5/xy";
import { ProgressBar } from "react-bootstrap";
import { Progressbar } from "../../../../AbstractElements";

const CandidatesByCity = () => {
  let data = [
    { id: "US-AL", value: 0 },
    { id: "US-AK", value: 0 },
    { id: "US-AZ", value: 0 },
    { id: "US-AR", value: 0 },
    { id: "US-CA", value: 60 },
    { id: "US-CO", value: 0 },
    { id: "US-CT", value: 0 },
    { id: "US-DE", value: 0 },
    { id: "US-FL", value: 80 },
    { id: "US-GA", value: 0 },
    { id: "US-HI", value: 10 },
    { id: "US-ID", value: 0 },
    { id: "US-IL", value: 0 },
    { id: "US-IN", value: 5 },
    { id: "US-IA", value: 0 },
    { id: "US-KS", value: 0 },
    { id: "US-KY", value: 0 },
    { id: "US-LA", value: 0 },
    { id: "US-ME", value: 0 },
    { id: "US-MD", value: 0 },
    { id: "US-MA", value: 0 },
    { id: "US-MI", value: 0 },
    { id: "US-MN", value: 0 },
    { id: "US-MS", value: 5 },
    { id: "US-MO", value: 0 },
    { id: "US-MT", value: 0 },
    { id: "US-NE", value: 0 },
    { id: "US-NV", value: 0 },
    { id: "US-NH", value: 0 },
    { id: "US-NJ", value: 0 },
    { id: "US-NM", value: 0 },
    { id: "US-NY", value: 40 },
    { id: "US-NC", value: 0 },
    { id: "US-ND", value: 0 },
    { id: "US-OH", value: 20 },
    { id: "US-OK", value: 0 },
    { id: "US-OR", value: 0 },
    { id: "US-PA", value: 0 },
    { id: "US-RI", value: 5 },
    { id: "US-SC", value: 0 },
    { id: "US-SD", value: 0 },
    { id: "US-TN", value: 0 },
    { id: "US-TX", value: 100 },
    { id: "US-UT", value: 0 },
    { id: "US-VT", value: 0 },
    { id: "US-VA", value: 0 },
    { id: "US-WA", value: 20 },
    { id: "US-WV", value: 0 },
    { id: "US-WI", value: 0 },
    { id: "US-WY", value: 0 },
  ];

  var minColor = "#CDD7F4";
  var maxColor = "#1264FD";

  const sortedData = data.sort((a, b) => b.value - a.value);
  const top5 = sortedData.slice(0, 5);
  const legendItems = top5.map(({ id, value }) => {
    // Extract state code and find corresponding state name
    const stateCode = id.split("-")[1];
    const stateName = getStateName(stateCode); // You need to implement this function

    // Interpolate color
    const color = interpolateColor(minColor, maxColor, value, 0, 100);

    return {
      city: `${stateName}`,
      count: value,
      color: color,
    };
  });

  function getStateName(stateCode) {
    const stateNames = {
      AL: "Alabama",
      AK: "Alaska",
      AZ: "Arizona",
      AR: "Arkansas",
      CA: "California",
      CO: "Colorado",
      CT: "Connecticut",
      DE: "Delaware",
      FL: "Florida",
      GA: "Georgia",
      HI: "Hawaii",
      ID: "Idaho",
      IL: "Illinois",
      IN: "Indiana",
      IA: "Iowa",
      KS: "Kansas",
      KY: "Kentucky",
      LA: "Louisiana",
      ME: "Maine",
      MD: "Maryland",
      MA: "Massachusetts",
      MI: "Michigan",
      MN: "Minnesota",
      MS: "Mississippi",
      MO: "Missouri",
      MT: "Montana",
      NE: "Nebraska",
      NV: "Nevada",
      NH: "New Hampshire",
      NJ: "New Jersey",
      NM: "New Mexico",
      NY: "New York",
      NC: "North Carolina",
      ND: "North Dakota",
      OH: "Ohio",
      OK: "Oklahoma",
      OR: "Oregon",
      PA: "Pennsylvania",
      RI: "Rhode Island",
      SC: "South Carolina",
      SD: "South Dakota",
      TN: "Tennessee",
      TX: "Texas",
      UT: "Utah",
      VT: "Vermont",
      VA: "Virginia",
      WA: "Washington",
      WV: "West Virginia",
      WI: "Wisconsin",
      WY: "Wyoming",
    };
    return stateNames[stateCode] || "Unknown";
  }

  function interpolateColor(minColor, maxColor, value, minValue, maxValue) {
    // Convert hexadecimal color strings to RGB values
    var minR = parseInt(minColor.slice(1, 3), 16);
    var minG = parseInt(minColor.slice(3, 5), 16);
    var minB = parseInt(minColor.slice(5, 7), 16);

    var maxR = parseInt(maxColor.slice(1, 3), 16);
    var maxG = parseInt(maxColor.slice(3, 5), 16);
    var maxB = parseInt(maxColor.slice(5, 7), 16);

    // Calculate the percentage of the value between the min and max
    var percentage = (value - minValue) / (maxValue - minValue);

    // Interpolate the color components
    var r = Math.round(minR + percentage * (maxR - minR));
    var g = Math.round(minG + percentage * (maxG - minG));
    var b = Math.round(minB + percentage * (maxB - minB));

    // Construct the color string in hexadecimal format
    var interpolatedColor =
      "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return interpolatedColor;
  }

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        projection: am5map.geoAlbersUsa(),
        layout: root.horizontalLayout,
      })
    );

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am4geodata_usaLow,
        valueField: "value",
        calculateAggregates: true,
      })
    );
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}: {value}",
    });
    polygonSeries.set("heatRules", [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color("#CDD7F4"),
        max: am5.color("#1264FD "),
        key: "fill",
      },
    ]);

    polygonSeries.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, []);
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
            Candidates By City
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
          <div className="mt-5">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                id="chartdiv"
                style={{ width: "100%", height: "200px" }}
              ></div>
              <div className="mt-5">
                {/* Loop through legendItems and create legend entries */}
                {legendItems.map((item) => (
                  // <div key={item.city}>
                  //   <span
                  //     style={{ backgroundColor: item.color, padding: "5px" }}
                  //   ></span>
                  //   <span>
                  //     {item.city} ({item.count})
                  //   </span>
                  // </div>
                  <Col style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: item.count }}>
                      {/* <Progressbar
                        attrProgress={{
                          value: "100",
                          className: "sm-progress-bar me-1 mb-0",
                          style: { backgroundColor: item.color },
                        }}
                      /> */}
                      <Progress
                        style={{ backgroundColor: item.color }}
                        className="sm-progress-bar me-1 mb-0"
                      />
                    </div>
                    <span style={{ fontSize: "14px", color: "black" }}>
                      {item.city}
                    </span>
                  </Col>
                ))}
              </div>
            </div>{" "}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default CandidatesByCity;
