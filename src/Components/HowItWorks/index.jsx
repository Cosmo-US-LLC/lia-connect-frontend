import JobProcessOverview from "Components/Alfren/Job/create/StepThree/JobProcessOverview";
import React from "react";
import { Col, Container, Row } from "reactstrap";

function HowItWorks() {
  return (
    <div>
        <h2 className="text-center pb-5 mb-4">How It Works</h2>
      <Container
        fluid={true}
        style={{ paddingBottom: "100px", textAlign: "center", maxWidth: "1200px" }}
      >
        <Row>
          <Col sm="12" className="">
            <JobProcessOverview />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HowItWorks;
