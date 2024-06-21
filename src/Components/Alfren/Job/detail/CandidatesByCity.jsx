import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Card, CardBody, Col, Progress } from "reactstrap";
import PakistanCitiesJson from "@amcharts/amcharts5-geodata/pakistanLow";

const CandidatesByCity = ({ CityStatsData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (CityStatsData && CityStatsData.length > 0) {
      const transformedData = CityStatsData.map((item) => ({
        id: item.id,
        value: item.value,
      }));
      setData(transformedData);
    }
  }, [CityStatsData]);

  const minColor = "#CDD7F4";
  const maxColor = "#1264FD";
  useEffect(() => {
    if (CityStatsData && CityStatsData.length > 0) {
      const transformedData = CityStatsData.map((item) => ({
        id: item.id || "N/A", // Replace empty id with "N/A"
        value: item.value,
      }));
      setData(transformedData);
    }
  }, [CityStatsData]);
  
  useEffect(() => {
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
        geoJSON: PakistanCitiesJson,
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
        min: am5.color(minColor),
        max: am5.color(maxColor),
        key: "fill",
      },
    ]);

    polygonSeries.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, [data, PakistanCitiesJson]);

  const sortedData = data.sort((a, b) => b.value - a.value);
  const top5 = sortedData.slice(0, 20);

  return (
    <Card style={{ height: "90%", marginLeft: "12px" }}>
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
          Candidates By States
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
            <div id="chartdiv" style={{ width: "100%", height: "200px" }}></div>
            <div
              className="mt-5 w-100"
              style={{
                height: "134px",
                overflow: "auto",
                padding: "12px",
              }}
            >
              {top5.map((item, index) => (
                <Col
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "black" }}>
                    {item.id}
                  </span>
                  <div style={{ width: "50%", textAlign: "end" }}>
                    <Progress
                      value={item.value}
                      max={top5[0].value}
                      style={{
                        backgroundColor: interpolateColor(
                          minColor,
                          maxColor,
                          item.value,
                          0,
                          top5[0].value
                        ),
                      }}
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
  );
};

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

  return `rgb(${r}, ${g}, ${b})`;
}

export default CandidatesByCity;
