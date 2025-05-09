import React from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { P } from "../../AbstractElements";

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer" style={{
        position: "fixed",
        display: "block",
        width: "100%"}
      } >
        <Container fluid={true}>
          <Row>
            <Col md="10" className="text-center">
              <P attrPara={{ className: "mb-0" }}>
                {"2024 - 25 Copy Right by Alfren HR powerd by Cosmo Inc."}
              </P>
            </Col>
          </Row>
        </Container>
      </footer>
    </Fragment >
  );
};

export default Footer;
