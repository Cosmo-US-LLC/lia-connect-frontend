import React, { Fragment } from "react";
import { Card, Col, Row } from "reactstrap";

function JobSkills({ candidateDetails }) {
  return (
    <Fragment>
      <Card className="hovercard ">
        <div className="info">
          <Row className="text-left">
            <Col sm="12" lg="12" className="order-sm-0 order-xl-1 mb-3">
              <h5>
                <strong>Jobs</strong>
              </h5>

              <div>
                {candidateDetails?.candidate?.jobs?.map((job, index) => (
                  <a href={`/jobs/detail/${job?.id}`} key={index} style={{ fontSize: "16px", padding: "0px 10px", backgroundColor: "#f0f0f0", borderRadius: "10px", margin: "5px", display: "inline-block" }}>
                    {job?.name}
                  </a>
                ))}
              </div>
            </Col>

            <Col sm="12" lg="12" className="order-sm-0 order-xl-1">
              <h5>
                <strong>Skills</strong>
              </h5>

              <div>
                {candidateDetails?.candidate?.skills?.skills?.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary m-1"
                      style={{ fontSize: "12px" }}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Fragment>
  );
}

export default JobSkills;
