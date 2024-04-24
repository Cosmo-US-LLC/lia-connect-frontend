import React, { Fragment, useEffect, useState } from "react";
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

import { Btn, H4, H5, H6, Image, P } from "../../../../../AbstractElements";
import FooterCard from "../../../../Forms/FormControl/Common/FooterCard";
import HeaderCard from "../../../../Common/Component/HeaderCard";
import { Flag, Info, Plus, Video, X, Youtube } from "react-feather";
import StepActiveIcon from "../../.././../../assets/used-files/icons/candidate.svg";
import { Link } from "react-router-dom";

const StepOne = ({
  setJobName,
  jobName,
  setJobPriority,
  jobPriority,
  skills,
  setSkills,
  removeSkill,
  linkedInSearch,
  linkedInProfile,
  setLinkedInSearch,
  setLinkedInProfile,
  handleNext,
}) => {
  const options = [
    {
      value: 1,
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
      value: 2,
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
      value: 3,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "jobName") {
      setJobName(value);
    } else if (name == "skillInputValue") {
      setSkillInputValue(value);
    } else if (name == "linkedInSearch") {
      setLinkedInSearch(value);
    } else if (name == "linkedInProfile") {
      setLinkedInProfile(value);
    }
  };
  const handleSelectChange = (e) => {
    setJobPriority(e.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputValue = e.target.value;
      if (inputValue.trim() !== "") {
        setSkills([...skills, inputValue.trim()]);
        setSkillInputValue("");
      }
    }
  };

  const [enterSkill, setEnterSkill] = useState(false);
  const [skillInputValue, setSkillInputValue] = useState("");
  const [linkedInSearchButton, setLinkedInSearchButton] = useState(true);
  const [nextActive, setNextActive] = useState(false);

  useEffect(() => {
    if (jobName && jobPriority && skills.length) {
      if (linkedInSearchButton && linkedInSearch) {
        setNextActive(true);
      } else {
        if (linkedInProfile) {
          setNextActive(true);
        }
      }
    }
  }, [skills, jobName, jobPriority, linkedInSearch, linkedInProfile]);

  const handleNextStep = (e) => {
    e.preventDefault(e);
    handleNext(e);
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
                        name="jobName"
                        value={jobName}
                        placeholder="Sr. UI/UX Designers"
                        onChange={handleChange}
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
                        defaultValue={options[jobPriority]}
                        styles={customStyles}
                        name="jobPriority"
                        onChange={handleSelectChange}
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
                      {enterSkill ? (
                        <Input
                          className="form-control"
                          type="text"
                          name="skillInputValue"
                          value={skillInputValue}
                          placeholder="Type skill name here......"
                          onKeyDown={handleKeyPress}
                          onChange={handleChange}
                        />
                      ) : (
                        <button
                          className="btn btn-outline-dark btn-pill pe-3 ps-3 pt-2 pb-2 d-inline-flex"
                          onClick={() => setEnterSkill(true)}
                        >
                          {" "}
                          <Plus strokeWidth={2} size={20} />
                          <span>Add Skills</span>
                        </button>
                      )}
                      {skills.map((skill, index) => (
                        <button
                          key={index}
                          style={{
                            display: "inline-flex",
                            border: "none",
                            color: "#595959",
                            backgroundColor: "#F7F7F7",
                            borderRadius: "4px",
                            padding: "6px",
                            marginRight: "8px",
                          }}
                        >
                          <span
                            className="ms-2 me-2"
                            style={{ fontSize: "12px" }}
                          >
                            {skill}
                          </span>
                          <X
                            strokeWidth={1.5}
                            size={16}
                            onClick={() => removeSkill(skill)}
                          />
                        </button>
                      ))}
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
                        {linkedInSearchButton ? (
                          <>
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
                              onClick={() => setLinkedInSearchButton(false)}
                            >
                              Linkedin Profiles URL
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              style={{
                                color: "black",
                                fontSize: "14px",
                                paddingTop: "13px",
                                paddingBottom: "13px",
                                paddingRight: "20px",
                                paddingLeft: "20px",
                                fontWeight: "400",
                              }}
                              onClick={() => setLinkedInSearchButton(true)}
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
                                fontWeight: "400",
                                backgroundColor: "#1264FD",
                                border: "1px solid #1264FD",
                                borderRadius: "30px",
                                color: "white",
                                boxShadow: " 0px 0px 32px 0px #3D64FF94",
                              }}
                            >
                              Linkedin Profiles URL
                            </span>
                          </>
                        )}
                      </span>
                      <div className="mt-5">
                        <H6
                          attrH6={{
                            className: "d-flex justify-content-between",
                          }}
                        >
                          {linkedInSearchButton ? (
                            <>
                              <span
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                Filter profiles in the 
                                <span style={{ color: "#1264FD" }}>
                                  LinkedIn search
                                </span>
                                 and paste the URL below{" "}
                                <span className="ms-2 text-danger">*</span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                Copy the  
                                <span style={{ color: "#1264FD" }}>
                                  LinkedIn Profile URL
                                </span>
                                 and paste it below{" "}
                                <span className="ms-2 text-danger">*</span>
                              </span>
                            </>
                          )}
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
                        {linkedInSearchButton ? (
                          <>
                            <Input
                              className="form-control"
                              name="linkedInSearch"
                              value={linkedInSearch}
                              type="text"
                              placeholder="https://www.linkedin.com/search..."
                              onChange={handleChange}
                            />
                          </>
                        ) : (
                          <>
                            <Input
                              className="form-control"
                              name="linkedInProfile"
                              value={linkedInProfile}
                              type="text"
                              placeholder="https://www.linkedin.com/abc..."
                              onChange={handleChange}
                            />
                          </>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="12" style={{ textAlign: "end" }}>
                    <Link
                      onClick={handleNextStep}
                      className="btn btn-primary pe-5 ps-5 pt-2 pb-2"
                      style={{ opacity: nextActive ? "100%" : "60%" }}
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
