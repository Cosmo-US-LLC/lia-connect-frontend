import { Progressbar } from "AbstractElements";
import { BorderRadius } from "constant";
import React, { Fragment } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, Col } from "reactstrap";

const CandidateFunnel = ({ CandidateFunnel }) => {

  // Calculate total candidates
  const totalCandidates = CandidateFunnel?.pending + CandidateFunnel?.outreach + CandidateFunnel?.response;

  // Calculate percentages for progress bars
  const pendingPercentage = totalCandidates ? (CandidateFunnel?.pending / totalCandidates) * CandidateFunnel?.total : 0;
  const outreachPercentage = totalCandidates ? (CandidateFunnel?.outreach / totalCandidates) * CandidateFunnel?.total : 0;
  const responsePercentage = totalCandidates ? (CandidateFunnel?.response / totalCandidates) * CandidateFunnel?.total : 0;
  const totalPercentage = CandidateFunnel?.total
  return (
    <Fragment>
      <Card style={{ height: "85%", position: 'relative', bottom: '32px' }}>
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
                borderBottom: "1px solid #595959",
              }}
            ></span>
          </p>
          <div>
            <div className="progress-showcase">
              <Col style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: `${totalPercentage}%` }}>
                  <Progressbar
                    attrProgress={{
                      value: "100",
                      color: "progress6",
                      className: "sm-progress-bar me-1 mb-0",
                      BorderRadius: '10px'
                    }}
                  />
                </div>
                <span style={{ fontSize: "14px", color: "black" }}>{totalPercentage}</span>
              </Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: `${pendingPercentage}%` }}>
                  <Progressbar
                    isFunalProgress
                    attrProgress={{
                      value: "100",
                      color: "progress4",
                      className: "sm-progress-bar me-1 mb-0",
                      BorderRadius: '10px',
                    }}
                  />
                </div>
                <span style={{ fontSize: "14px", color: "black" }}>{CandidateFunnel?.pending}</span>
              </Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: `${outreachPercentage}%` }}>
                  <Progressbar
                    attrProgress={{
                      value: "100",
                      color: "progress5",
                      className: "sm-progress-bar me-1 mb-0",
                      BorderRadius: '10px'
                    }}
                  />
                </div>
                <span style={{ fontSize: "14px", color: "black" }}>{CandidateFunnel?.outreach}</span>
              </Col>

            </div>
            <div style={{ marginTop: '30px' }}>
              <div className="pb-2">
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.675781" width="14" height="14" rx="7" fill="#1264fd" />
                </svg>

                <span
                  className="ms-3"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  All:
                </span>
                <span
                  className="ms-3"
                  style={{ fontSize: "13px", fontWeight: 400 }}
                >
                  All candidates exist in Sequence.
                </span>
              </div>
              <div className="pb-2">
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.675781" width="14" height="14" rx="7" fill="#0B9289" />
                </svg>

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
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.675781" width="14" height="14" rx="7" fill="#924C0B" />
                </svg>

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
              {/* <div className="pb-2 d-flex">
                <div>
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.675781" width="14" height="14" rx="7" fill="#66920B" />
                  </svg>

                </div>
                <div>
                  <div
                    className="ms-3"
                    style={{ fontSize: "13px", fontWeight: 600 }}
                  >
                    Responses:
                  </div>
                  <div
                    className="ms-3"
                    style={{ fontSize: "13px", fontWeight: 400, paddingLeft: '90px', position: 'relative', bottom: '17px' }}
                  >
                    This is a sum up with all message replies and connection
                    acceptance.
                  </div>
                </div>
              </div> */}
              <div style={{ textAlign: "center" }}>
                {/* Static display of average years */}
                <p style={{ fontWeight: 900, fontSize: "100px", color: "#66920B" }}>
                  {CandidateFunnel?.response}
                </p>
                <p style={{ fontWeight: 500, fontSize: "12px", color: "#212529", paddingTop: '10px', position: 'relative', bottom: '60px' }}>
                  This is a sum up with all message replies and connection
                </p>
              </div>

            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CandidateFunnel;
