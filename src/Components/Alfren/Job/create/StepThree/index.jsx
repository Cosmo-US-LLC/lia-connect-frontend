import React, { Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  InputGroupText,
  Input,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
} from "reactstrap";
import { H6 } from "../../../../../AbstractElements";
import { Link } from "react-router-dom";

const StepThree = ({ handlePrevious, handleNext }) => {
  const handleBackStep = (e) => {
    e.preventDefault(e);
    handlePrevious(e);
  };
  const handleNextStep = (e) => {
    e.preventDefault(e);
    handleNext(e);
  };
  return (
    <Fragment>
      <Container fluid={true} style={{ width: "80%" }}>
        <Row style={{ justifyContent: "center" }}>
          <Col xl="8" className="mt-5">
            <Card>
              <CardBody>
                <Row>
                  <Col xl="8" style={{ textAlign: "left" }}>
                    <FormGroup>
                      <div className="checkbox checkbox-solid-primary">
                        <Input
                          id="solid1"
                          type="checkbox"
                          defaultChecked
                          name="1"
                        />
                        <Label for="solid1">
                          Same Candidates found in other Jobs{" "}
                          <span style={{ color: "#819ACB" }}>
                            (Recommended)
                          </span>
                        </Label>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="checkbox checkbox-solid-primary">
                        <Input id="solid3" type="checkbox" name="2" />
                        <Label for="solid3">
                          Does not have an open profile
                        </Label>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="checkbox checkbox-solid-primary">
                        <Input id="solid2" type="checkbox" name="3" />
                        <Label for="solid2">
                          No photo on candidate’s profile
                        </Label>
                      </div>
                    </FormGroup>
                  </Col>

                  <Col xl="12" style={{ textAlign: "center" }}>
                    <Link
                      onClick={handleBackStep}
                      className="btn btn-outline-light pe-5 ps-5 pt-2 pb-2 me-3"
                      // style={{ opacity: nextActive ? "100%" : "60%" }}
                    >
                      <span>Back to Sequence </span>
                    </Link>
                    <Link
                      onClick={handleNextStep}
                      className="btn btn-primary pe-5 ps-5 pt-2 pb-2"
                    >
                      <span>Complete</span>
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default StepThree;
