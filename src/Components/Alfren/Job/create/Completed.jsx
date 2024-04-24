import React, { Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";

const Completed = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12" className="mt-5">
            <InputGroup style={{ width: "120%", border: "none" }}>
              <InputGroupText
                style={{
                  border: "none",
                  backgroundColor: "#f5f9ff",
                  color: "#5C5E64",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                View Per Page
              </InputGroupText>
              <Input
                placeholder="50"
                className="js-example-basic-single col-sm-6"
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Completed;
