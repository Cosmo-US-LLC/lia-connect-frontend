import React, { useLayoutEffect, Fragment, useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Card, CardBody, Col, Progress } from "reactstrap";
import pakistanCitiesGeoJSON from "@amcharts/amcharts5-geodata/pakistanLow"; // Ensure this contains city data

const CandidatesByCity = ({ CityStatsData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (CityStatsData && CityStatsData.length > 0) {
      // Transform CityStatsData into a format compatible with amCharts
      const transformedData = CityStatsData.map(item => ({
        id: item.id,
        value: item.value,
      }));
      setData(transformedData);
    }
  }, [CityStatsData]);

  const minColor = "#CDD7F4";
  const maxColor = "#1264FD";

  const sortedData = data.sort((a, b) => b.value - a.value);
  const top5 = sortedData.slice(0, 5);
  const legendItems = top5.map(({ id, value }) => {
    const cityName = getCityName(id);

    const color = interpolateColor(minColor, maxColor, value, 0, 100);

    return {
      city: `${cityName}`,
      count: value,
      color: color,
    };
  });

  function getCityName(cityCode) {
    const cityNames = {
      "New York": "New York City",
      "Kansas City": "Kansas City",
      "Columbus": "Columbus",
      "Yonkers": "Yonkers",
      "Irving": "Irving",
      "Brooklyn": "Brooklyn",
      "Cypress": "Cypress"
    };
    return cityNames[cityCode] || "Unknown";
  }

  function interpolateColor(minColor, maxColor, value, minValue, maxValue) {
    const minR = parseInt(minColor.slice(1, 3), 16);
    const minG = parseInt(minColor.slice(3, 5), 16);
    const minB = parseInt(minColor.slice(5, 7), 16);

    const maxR = parseInt(maxColor.slice(1, 3), 16);
    const maxG = parseInt(maxColor.slice(3, 5), 16);
    const maxB = parseInt(maxColor.slice(5, 7), 16);

    const percentage = (value - minValue) / (maxValue - minValue);

    const r = Math.round(minR + percentage * (maxR - minR));
    const g = Math.round(minG + percentage * (maxG - minG));
    const b = Math.round(minB + percentage * (maxB - minB));

    const interpolatedColor =
      "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return interpolatedColor;
  }

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      })
    );

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: pakistanCitiesGeoJSON,
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
        max: am5.color("#1264FD"),
        key: "fill",
      },
    ]);

    polygonSeries.data.setAll(data); // Set the transformed data

    return () => {
      root.dispose();
    };
  }, [data]); // Depend on data to update the chart when data changes

  return (
    <Fragment>
      <Card style={{ height: "90%", marginLeft: '12px' }}>
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
              <div className="mt-5 w-100">
                {legendItems?.map((item, index) => (
                  <Col style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }} key={index}>
                    <span style={{ fontSize: "14px", color: "black" }}>
                      {item.city}
                    </span>
                    <div style={{ width: "50%", textAlign: 'end' }}>
                      <Progress
                        value={item.count}
                        max={top5[0].count} // Use the max count for scaling
                        style={{ backgroundColor: item.color }}
                        className="sm-progress-bar me-1 mb-0"
                      />
                    </div>
                  </Col>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CandidatesByCity;
