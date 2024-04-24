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
  CardBody,
  CardHeader,
  Label,
  FormGroup,
} from "reactstrap";
import Select from "react-select";

import { H4, H5, H6, Image, P } from "../../../../../AbstractElements";
import FooterCard from "../../../../Forms/FormControl/Common/FooterCard";
import HeaderCard from "../../../../Common/Component/HeaderCard";
import { Flag } from "react-feather";
import StepActiveIcon from "../../.././../../assets/used-files/icons/candidate.svg";

const StepOne = () => {
  const options = [
    {
      value: "1",
      label: (
        <>
          <Flag fill="#DE3E3E" color="#AA1313" size={14} strokeWidth={1.5} />
          <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
            High
          </span>
        </>
      ),
    },
    {
      value: "2",
      label: (
        <>
          <Flag fill="#FECF41" color="#E2B323" size={14} strokeWidth={1.5} />
          <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
            Medium
          </span>
        </>
      ),
    },
    {
      value: "3",
      label: (
        <>
          <Flag fill="#CECECE" color="#ABABAB" size={14} strokeWidth={1.5} />
          <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
            Low
          </span>
        </>
      ),
    },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%", // Match the width with other input fields
      minHeight: "44px",
      fontSize: "14px", // Match the font size with other input fields
      borderColor: "#efefef",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "14px", // Match the font size with other input fields
      padding: "10px 12px", // Adjust padding to reduce the height
    }),
  };
  return (
    <Fragment>
      <Container fluid={true}>
        <Row style={{ justifyContent: "center" }}>
          <Col xl="8" className="mt-5">
            <Card>
              <CardHeader>
                <div style={{ textAlign: "left" }}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginRight: "10px",
                    }}
                  >
                    Create Job
                  </span>
                  <span style={{ color: "#819ACB", fontSize: "12px" }}>
                    (All Fields with * are Mandatory)
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl="8">
                    <FormGroup style={{ textAlign: "left" }}>
                      <H6>
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>
                          Job Name
                        </span>
                        <span className="ms-2 text-danger">*</span>
                      </H6>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Sr. UI/UX Designers"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="4">
                    <FormGroup style={{ textAlign: "left" }}>
                      <H6>
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>
                          Job Priority
                        </span>
                        <span className="ms-2 text-danger">*</span>
                      </H6>
                      <Select
                        options={options}
                        defaultValue={options[0]}
                        styles={customStyles}
                      />
                    </FormGroup>
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

export default StepOne;
