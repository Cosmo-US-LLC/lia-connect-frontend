import React, { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, P, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
import RadialProgressChart from "../../Common/RadialProgressChart";
import { MessageSquare } from "react-feather";
import Clock from "../../../../assets/used-files/images/jobDetail/clock.svg";
import { Value } from "sass";
const ResponseRate = () => {
  const data = {
    series: [58],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%",
            margin: 15,
            image: Clock,
            imageWidth: 28,
            imageHeight: 28,
            imageClipped: false,
          },
          dataLabels: { name: { show: false }, value: { show: false } },
        },
      },
      stroke: {
        lineCap: "round",
      },
      colors: ["#1264FD"],
      labels: ["Cricket"],
    },
  };

  return (
    <Fragment>
      <Card>
        <CardBody style={{ padding: "20px", paddingBottom: "0px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 400,
              position: "relative",
              width: "100%",
              color: "#595959",
            }}
          >
            Responses
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "12%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
          </p>

          <Row>
            <Col xl="4" className="ps-0 pe-0">
              <RadialProgressChart chartHeight={140} chartOption={data} />
            </Col>

            <Col xl="8">
              <div style={{ textAlign: "left" }} className="mt-4 ">
                <h4
                  style={{
                    fontWeight: 900,
                    fontSize: "38px",
                    color: "#1264FD",
                  }}
                >
                  58%
                </h4>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#819ACB",
                  }}
                >
                  Responses Received
                </p>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default ResponseRate;
