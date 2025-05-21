import React, { Fragment } from "react";
import { Card, Col, Row } from "reactstrap";

function ExpeirenceCard({ candidateDetails }) {
  return (
    <Fragment>
      <Card className="hovercard ">
        <div className="info">
          <Row className="text-left">
            <Col sm="12" lg="12" className="order-sm-0 order-xl-1 mb-3">
              <h5 className="mb-2">
                <strong>Expeirence</strong>
              </h5>

              <div>
                {candidateDetails?.candidate?.experiences?.map((job, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "5px 0",
                      //   backgroundColor: "#f0f0f0",
                      //   borderRadius: "12px",
                      //   margin: "25px 0px",
                      marginTop: "30px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "12px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "10px",
                        padding: "5px 10px",
                      }}
                    >
                      {job?.title}
                    </span>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className=" py-3">
                        <div style={{ fontSize: "18px", fontWeight: "600" }}>
                          {job?.company?.split(" · ")[1]}
                        </div>
                        <div style={{ color: "#6c757d" }}>
                          {job?.company?.split(" · ")[0]}
                        </div>
                      </div>

                      <img
                        src={job?.logo}
                        alt="Company Logo"
                        style={{
                          width: "80px",
                          height: "60px",
                          margin: "10px 0px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <span style={{ color: "#6c757d" }}>{job?.location?.split(" · ")[0]}</span>
                    <div className="d-flex justify-content-between align-items-center">
                      {/* minWidth: "80px", textAlign: "center",  */}
                      {/* <div style={{ minWidth: "80px", textAlign: "center", fontWeight: "600" }}> */}
                      <div style={{ fontWeight: "600" }}>
                        {job?.location?.split(" · ")[1]}
                      </div>
                      <div>{job?.duration?.split(" · ")[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Fragment>
  );
}

export default ExpeirenceCard;
