import React, { Fragment, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import completedJob from "../../../../assets/used-files/images/completedJob.svg";
import { useNavigate } from "react-router-dom";
import JobProcessOverview from "./StepThree/JobProcessOverview";

const Completed = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/Jobs");
  };

  return (
    <Fragment>
      <Container fluid={true} style={{ textAlign: "center" }}>
        {/* Job Process Overview Section */}
        <Row>
          <Col sm="12" className="mt-4">
            <JobProcessOverview />
          </Col>
        </Row>
        {/* <Row>
          <Col sm="12" className="">
            <Image attrImage={{ src: completedJob }} />
          </Col>
        </Row> */}
        {/* Go Back Button */}
        <Row>
          <Col sm="12" className="mt-4">
            <Button
              color="primary"
              onClick={handleGoBack}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                borderRadius: "5px",
              }}
            >
              Take Me Back to Jobs
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Completed;
