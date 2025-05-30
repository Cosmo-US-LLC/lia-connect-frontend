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

import { Btn, H4, H5, H6, Image, P } from "../../../../../AbstractElements";
import FooterCard from "../../../../Forms/FormControl/Common/FooterCard";
import HeaderCard from "../../../../Common/Component/HeaderCard";
import { Flag, Info, Plus, Video, X, Youtube } from "react-feather";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

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
  setJobId,
  register,
  errors,
  setSkillInputValue,
  skillInputValue,
  linkedInSearchValue,
  clearErrors,
  isLoading,
  hasErrors,
  getCandidateCount,
}) => {
  console.log("hasErrors i also want this", !hasErrors);
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
    console.log("eeeeeeeeeeeeeeeeee", name, value);
    if (name == "jobName") {
      setJobName(value);
    } else if (name == "skillInputValue") {
      setSkillInputValue(value);
      clearErrors("skillInputValue");
    } else if (name == "linkedInSearch") {
      console.log("value linkedInSearchlinkedInSearch", value);
      setLinkedInSearch(value);
    } else if (name == "linkedInProfile") {
      setLinkedInProfile(value);
    } else if (name == "maxCandidates") {
      setMaxCandidates(value);
    }
  };

  const handleSelectChange = (e) => {
    setJobPriority(e.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && skillInputValue.trim() !== "") {
      e.preventDefault();
      setSkills([...skills, skillInputValue.trim()]);
      setSkillInputValue("");
      clearErrors("skillInputValue");
    }
  };

  const [enterSkill, setEnterSkill] = useState(false);
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

  const [maxCandidates, setMaxCandidates] = useState(null);
  const [isMaxChecked, setIsMaxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsMaxChecked(!isMaxChecked);
    setMaxCandidates(isMaxChecked ? "" : "500");
  };

  return (
    <Fragment>
      <Container fluid={true} style={{ width: "90%" }}>
        <Row style={{ justifyContent: "center" }}>
          <Col xl="8" className="mt-5">
            <Card>
              <CardHeader className="">
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
                    <div className="form-group">
                      <H6
                        attrH6={{
                          className: "d-flex justify-content-between",
                        }}
                      >
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>
                          Job Name <span className="ms-2 text-danger">*</span>
                        </span>
                      </H6>
                      <input
                        style={{
                          border: errors.jobName
                            ? ".1px solid #f2abab"
                            : jobName
                            ? "1px solid #efefef"
                            : "1px solid #efefef",
                        }}
                        type="text"
                        name="jobName"
                        value={jobName}
                        placeholder="Sr. UI/UX Designers"
                        onChange={handleChange}
                        {...register("jobName")}
                        className={`form-control shadow-none ${
                          errors.jobName ? "is-invalid" : ""
                        }`}
                      />

                      <div className="invalid-feedback text-start">
                        {errors.jobName?.message}
                      </div>
                    </div>
                  </Col>
                  <Col xl="4">
                    <H6
                      attrH6={{
                        className: "d-flex justify-content-between",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        Job Priority
                        <span className="ms-2 text-danger">*</span>
                      </span>
                      <div style={{ textAlign: "right" }} id="responseToolTip">
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
                            <div className="ms-2 text-white">
                              Jobs with higher priority will be processed
                              faster.
                            </div>
                          </div>
                        </UncontrolledTooltip>
                      </div>
                    </H6>
                    <select
                      style={{
                        padding: "12px",
                        position: "relative",
                        bottom: "4px",
                      }}
                      onChange={(e) =>
                        handleSelectChange(e.target.value.toUpperCase())
                      }
                      {...register("jobPriority")}
                      className={`form-select ${
                        errors.jobPriority ? "is-invalid" : ""
                      }`}
                      defaultValue="Medium" // Set "Medium" as the default value
                    >
                      {options.map((option) => (
                        <option
                          key={option.value}
                          value={option.label.props.children[1].props.children}
                        >
                          {option.label.props.children[1].props.children}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col xl="12">
                    <FormGroup className="text-start mt-3">
                      <H6
                        attrH6={{
                          className: "d-flex justify-content-between",
                        }}
                      >
                        <div className="invalid-feedback">
                          {errors.jobPriority?.message}
                        </div>
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>
                          Skills <span className="ms-2 text-danger">*</span>
                        </span>
                      </H6>
                      {enterSkill ? (
                        <>
                          <input
                            style={{
                              border: errors.skillInputValue
                                ? ".1px solid #f2abab"
                                : skillInputValue
                                ? "1px solid #efefef"
                                : "1px solid #efefef",
                              background: "#EBF1FC",
                              marginRight: "3px",
                            }}
                            type="text"
                            name="skillInputValue"
                            value={skillInputValue}
                            placeholder="Type skill name here......"
                            onKeyDown={handleKeyPress}
                            onChange={handleChange}
                            className={`form-control shadow-none ${
                              errors.skillInputValue ? "is-invalid" : ""
                            }`}
                          />
                        </>
                      ) : (
                        <>
                          <button
                            style={{
                              border: errors.jobName
                                ? ".1px solid #f2abab"
                                : jobName
                                ? "1px solid #00ff00"
                                : "1px solid #efefef",
                              background: "#EBF1FC",
                              marginRight: "3px",
                            }}
                            className="btn btn-pill pe-3 ps-3 pt-2 pb-2 d-inline-flex"
                            onClick={() => setEnterSkill(true)}
                          >
                            {" "}
                            <Plus strokeWidth={2} size={20} />
                            <span>Add Skills</span>
                          </button>
                        </>
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
                            marginTop: "8px",
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
                      <div className="invalid-feedback">
                        {errors.skillInputValue?.message}
                      </div>
                    </FormGroup>
                  </Col>

                  <Col xl="12" className="mt-3">
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
                                boxShadow:
                                  " rgba(61, 100, 255, 0.58) 0px 0px 21px 0px",
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
                                boxShadow:
                                  " rgba(61, 100, 255, 0.58) 0px 0px 21px 0px",
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
                          {!linkedInSearchButton ? (
                            <>
                              <span
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                Filter profiles in the{" "}
                                <span style={{ color: "#1264FD" }}>
                                  LinkedIn search
                                </span>{" "}
                                and paste the URL below{" "}
                                <span className="ms-2 text-danger">*</span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                Copy the{" "}
                                <span style={{ color: "#1264FD" }}>
                                  LinkedIn Profile URL{" "}
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
                            <div style={{ position: "relative" }}>
                              <input
                                style={{
                                  border: errors.linkedInSearch
                                    ? ".1px solid #f2abab"
                                    : linkedInSearch
                                    ? "1px solid #efefef"
                                    : ".1px solid #efefef",
                                  background: "#EBF1FC",
                                  marginRight: "3px",
                                }}
                                type="text"
                                name="linkedInSearch"
                                placeholder="https://www.linkedin.com/search..."
                                {...register("linkedInSearch")}
                                className={`form-control shadow-none ${
                                  errors.linkedInSearch
                                    ? "is-invalid"
                                    : linkedInSearchValue && "is-valid"
                                }`}
                              />
                              {!errors.linkedInSearch &&
                                linkedInSearchValue && (
                                  <FaCheck
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      color: "green",
                                    }}
                                  />
                                )}
                              {errors.linkedInSearch && (
                                <div className="invalid-feedback text-start">
                                  {errors.linkedInSearch.message}
                                </div>
                              )}
                            </div>
                            {/* <div style={{ position: 'relative' }}>
                              <input
                                style={{
                                  border: errors.linkedInSearch ? ".1px solid #f2abab" : linkedInSearchValue ? "1px solid green" : ".1px solid #efefef",
                                  background: '#EBF1FC',
                                  marginRight: '3px'
                                }}
                                type="text"
                                name="linkedInSearch"
                                placeholder="https://www.linkedin.com/search..."
                                {...register('linkedInSearch')}
                                value={linkedInSearch}
                                onChange={handleChange}
                                className={`form-control shadow-none ${errors.linkedInSearch ? 'is-invalid' : linkedInSearchValue && 'is-valid'}`}
                              />
                              {!errors.linkedInSearch && linkedInSearchValue && (
                                <FaCheck
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'green',
                                  }}
                                />
                              )}
                              {errors.linkedInSearch && (
                                <div className="invalid-feedback text-start">{errors.linkedInSearch.message}</div>
                              )}
                            </div> */}
                          </>
                        ) : (
                          <>
                            <textarea
                              className="form-control"
                              name="linkedInProfile"
                              value={linkedInProfile}
                              placeholder="https://www.linkedin.com/abc..."
                              onChange={handleChange}
                              style={{ height: "150px" }} // Set the height here
                            />
                          </>
                        )}
                      </div>
                    </FormGroup>
                    {linkedInSearchValue && !hasErrors && <div className="text-start" style={{ color: "#595959" }}>
                        <p style={{ fontSize: "12px" }}>
                          LinkedIn profile found: <strong>{"1000+"}</strong>
                        </p>
                        <p style={{ fontSize: "12px" }}>
                          How many users you would like to add to this list?{" "}
                          <span className="ms-2 text-danger">
                            *{" "}
                            <strong style={{ color: "#9F9B9B" }}>
                              (max 500)
                            </strong>
                          </span>
                        </p>
                        <div>
                          <div className="d-flex gap-3">
                            <span>
                              <div>
                                <input
                                  style={{
                                    border: errors.maxCandidates
                                      ? ".1px solid #f2abab"
                                      : maxCandidates
                                      ? "1px solid #efefef"
                                      : "1px solid #efefef",
                                    background: "#EBF1FC",
                                    marginRight: "3px",
                                    width: "60px",
                                    height: "14px",
                                    display: "inline-block",
                                  }}
                                  min={1}
                                  max={500}
                                  type="text"
                                  name="maxCandidates"
                                  value={maxCandidates}
                                  onChange={handleChange}
                                  {...register("maxCandidates")}
                                  className={`form-control shadow-none ${
                                    errors.maxCandidates ? "is-invalid" : ""
                                  }`}
                                />
                                <span
                                  style={{ position: "absolute" }}
                                  className="invalid-feedback text-start"
                                >
                                  {errors.maxCandidates?.message}
                                </span>
                              </div>
                            </span>
                            <div className="display-flex-style gap-1">
                              <input
                                className="inp-cbx absolute"
                                id="morning"
                                type="checkbox"
                                checked={isMaxChecked}
                                onChange={handleCheckboxChange}
                              />{" "}
                              <span
                                style={{ fontSize: "12px", color: "black" }}
                                className="relative mottom-1.5"
                              >
                                max
                              </span>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>}
       
                  </Col>
                  <Col xl="12" style={{ textAlign: "end" }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      <span>
                        {isLoading ? (
                          <>
                            <i className="fa fa-spinner fa-spin" /> Loading...
                          </>
                        ) : (
                          "Next"
                        )}
                      </span>
                    </button>
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
