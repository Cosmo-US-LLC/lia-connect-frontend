import React, { useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Card, CardBody, Col, Progress } from "reactstrap";
import PakistanCitiesJson from "@amcharts/amcharts4-geodata/pakistanLow";

const CandidatesByCity = ({ CityStatsData }) => {

  const [data, setData] = useState([]);
  const chartDivRef = useRef(null);
  console.log('PakistanCitiesJson', PakistanCitiesJson)
  useLayoutEffect(() => {
    if (CityStatsData && CityStatsData.length > 0) {
      const transformedData = CityStatsData.map((item) => ({
        id: item.id || "N/A",
        value: item.value,
      }));
      setData(transformedData);
    }
  }, [CityStatsData]);

  const minColor = "#CDD7F4";
  const maxColor = "#1264FD";

  const sortedData = data && data.length > 0 ? [...data].sort((a, b) => b.value - a.value) : [];

  const top5 = sortedData && sortedData.slice(0, 5);
  const legendItems = top5?.map(({ id, value }) => {
    const stateCode = id.split("-")[1];
    const stateName = getStateName(stateCode);

    const color = value === 0 ? "#F0F0F0" : interpolateColor(minColor, maxColor, value, 0, 100);

    return {
      city: stateName,
      count: value,
      color: color,
    };
  });

  function getStateName(stateCode) {
    const stateNames = {
      BA: "Balochistan",
      JK: "Azad Kashmir",
      KP: "Khyber Pakhtunkhwa",
      PB: "Punjab",
      SD: "Sindh",
      TA: "Tribal Areas",
      GB: "Gilgit-Baltistan",
      IS: "Islamabad Capital Territory",
    };

    return stateNames[stateCode] || "Unknown";
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
    if (!chartDivRef.current) return;
    // let root = am5.Root.new("chartdiv");
    const root = am5.Root.new(chartDivRef.current);
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
        min: am5.color("#CDD7F4"),
        max: am5.color("#1264FD"),
        key: "fill",
      },
    ]);

    polygonSeries.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <Card id="chartdiv" ref={chartDivRef} style={{ height: "90%", marginLeft: "12px" }}>
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
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div id="chartdiv" style={{ width: "100%", height: "200px" }}></div>
            <div className="mt-5 w-100" style={{ height: '134px', overflow: 'auto', padding: '12px' }}>
            {legendItems?.map((item, index) => (
    <Col
      key={index}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          flex: 1,
          fontSize: '11px',
          color: 'black',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100% - 162px)', // Adjusted for progress bar width
          cursor: 'default',
        }}
        title={item.city} // Tooltip on hover
      >
        {item.city.length > 10 ? `${item.city.substring(0, 10)}...` : item.city}
      </span>
      <div style={{ width: '150px', textAlign: 'left' }}>
        <Progress
          value={item.count}
          max={legendItems[0].count}
          title={`Value: ${item.count}`}
          style={{
            backgroundColor: item.color,
            width: `${100 - index * 10}%`, // Decreasing width from left to right
            cursor: 'pointer',
            transformOrigin: 'left', // Adjust origin as needed
            transform: `scaleX(-1)`, // Flip horizontally if desired
            position:"relative",
            left:'150px'
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

export default CandidatesByCity;
