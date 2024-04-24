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
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";

import { H4, H5, H6, Image, P } from "../../../../../AbstractElements";
import FooterCard from "../../../../Forms/FormControl/Common/FooterCard";
import HeaderCard from "../../../../Common/Component/HeaderCard";
import { Flag, Info, Video, Youtube } from "react-feather";
import StepActiveIcon from "../../.././../../assets/used-files/icons/candidate.svg";
import { Link } from "react-router-dom";

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
                      <H6
                        attrH6={{
                          className: "d-flex justify-content-between",
                        }}
                      >
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>
                          Job Name <span className="ms-2 text-danger">*</span>
                        </span>
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
                      <H6
                        attrH6={{
                          className: "d-flex justify-content-between",
                        }}
                      >
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>
                          Job Priority{" "}
                          <span className="ms-2 text-danger">*</span>
                        </span>
                        <div
                          style={{ textAlign: "right" }}
                          id="responseToolTip"
                        >
                          {" "}
                          <Info
                            className="ms-1"
                            strokeWidth={1}
                            size={16}
                            color="#8FA8D7"
                          />
                          <UncontrolledTooltip
                            target="responseToolTip"
                            placement="left"
                            style={{
                              backgroundColor: "#595959",
                              boxShadow: "0px 6px 26px -3.89px #0000001A",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                left: "300px",
                                backgroundColor: "#595959",
                              }}
                              className="d-flex"
                            >
                              <Info color="#8FA8D7" size={70} />
                              <span className="ms-2 text-white">
                                Jobs with higher priority will be processed
                                faster.
                              </span>
                            </div>
                          </UncontrolledTooltip>
                        </div>
                      </H6>
                      <Select
                        options={options}
                        defaultValue={options[0]}
                        styles={customStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="12">
                    <FormGroup style={{ textAlign: "left" }}>
                      <H6
                        attrH6={{
                          className: "d-flex justify-content-between",
                        }}
                      >
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>
                          Skills <span className="ms-2 text-danger">*</span>
                        </span>
                      </H6>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Type skill name here......"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="12" className="mt-4">
                    <FormGroup style={{ textAlign: "center" }}>
                      <span
                        style={{
                          border: "1px solid rgb(232, 233, 238)",
                          fontSize: "14px",
                          paddingTop: "13px",
                          paddingBottom: "13px",
                          // width: "55%",
                          borderRadius: "30px",
                          backgroundColor: "white",
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            backgroundColor: "#1264FD",
                            boxShadow: " 0px 0px 32px 0px #3D64FF94",
                            border: "1px solid #1264FD",
                            fontSize: "14px",
                            borderRadius: "30px",
                            paddingTop: "13px",
                            paddingBottom: "13px",
                            paddingRight: "20px",
                            paddingLeft: "20px",
                            fontWeight: "400",
                          }}
                        >
                          LinkedIn Search URL
                        </span>
                        <span
                          style={{
                            paddingTop: "13px",
                            paddingBottom: "13px",
                            paddingRight: "20px",
                            paddingLeft: "20px",
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "400",
                          }}
                        >
                          Linkedin Profiles URL
                        </span>
                      </span>
                      <div className="mt-5">
                        <H6
                          attrH6={{
                            className: "d-flex justify-content-between",
                          }}
                        >
                          <span style={{ fontWeight: "600", fontSize: "14px" }}>
                            Filter profiles in the 
                            <span style={{ color: "#1264FD" }}>
                              LinkedIn search
                            </span>
                             and paste the URL below{" "}
                            <span className="ms-2 text-danger">*</span>
                          </span>
                          <div>
                            <Link
                              to={"#"}
                              className="d-flex"
                              style={{ fontSize: "12px", fontWeight: "400" }}
                            >
                              <Youtube size={14} />
                              <span className="ms-2">Watch Tutorial</span>
                            </Link>
                          </div>
                        </H6>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="https://www.linkedin.com/search..."
                          required
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="12" style={{ textAlign: "end" }}>
                    <Link
                      to={"create"}
                      className="btn btn-primary pe-5 ps-5 pt-2 pb-2"
                      style={{ opacity: "60%" }}
                      
                    >
                      <span>Next</span>
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

export default StepOne;
