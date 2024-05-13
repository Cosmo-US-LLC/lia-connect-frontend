import React, { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import {
  H4,
  H5,
  H6,
  Image,
  LI,
  Progressbar,
  UL,
} from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
const CandidateFunnel = () => {
  return (
    <Fragment>
      <Card style={{ height: "100%" }}>
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
            Candidate Funnel
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "8%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
          </p>
          <div>
            <div className="progress-showcase">
              <Col style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "72%" }}>
                  <Progressbar
                    attrProgress={{
                      value: "100",
                      color: "progress4",
                      className: "sm-progress-bar me-1 mb-0",
                    }}
                  />
                </div>
                <span style={{ fontSize: "14px", color: "black" }}>362</span>
              </Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "53%" }}>
                  <Progressbar
                    attrProgress={{
                      value: "100",
                      color: "progress5",
                      className: "sm-progress-bar me-1 mb-0",
                    }}
                  />
                </div>
                <span style={{ fontSize: "14px", color: "black" }}>159</span>
              </Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "32%" }}>
                  <Progressbar
                    attrProgress={{
                      value: "100",
                      color: "progress6",
                      className: "sm-progress-bar me-1 mb-0",
                    }}
                  />
                </div>
                <span style={{ fontSize: "14px", color: "black" }}>89</span>
              </Col>
            </div>
            <div className="mt-3">
              <div className="pb-2">
                <span
                  class="badge rounded-pill"
                  style={{ color: "#0B9289", backgroundColor: "#0B9289" }}
                >
                  .
                </span>
                <span
                  className="ms-3"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  Pending:
                </span>
                <span
                  className="ms-3"
                  style={{ fontSize: "13px", fontWeight: 400 }}
                >
                  All candidates that are not participated in any sequences.
                </span>
              </div>
              <div className="pb-2">
                <span
                  class="badge rounded-pill"
                  style={{ color: "#924C0B", backgroundColor: "#924C0B" }}
                >
                  .
                </span>
                <span
                  className="ms-3"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  Outreached:
                </span>
                <span
                  className="ms-3"
                  style={{ fontSize: "13px", fontWeight: 400 }}
                >
                  Candidates that are in contact with any Sequence action.
                </span>
              </div>
              <div className="pb-2">
                <span
                  class="badge rounded-pill"
                  style={{ color: "#66920B", backgroundColor: "#66920B" }}
                >
                  .
                </span>
                <span
                  className="ms-3"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  Responses:{" "}
                </span>
                <span
                  className="ms-3"
                  style={{ fontSize: "13px", fontWeight: 400 }}
                >
                  This is a sum up with all message replies and connection
                  acceptance.
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default CandidateFunnel;
