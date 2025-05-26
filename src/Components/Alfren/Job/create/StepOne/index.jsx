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
import { INSTANCE } from "Config/axiosInstance";
import JobTitleAutocomplete from "./JobTitleInput";
import SkillsAutocomplete from "./SkillsAutocomplete";
import ImageModal from "./ImageModal";

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
  setValue,
  fieldErrors,
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

  // const [skillData, setSkillsData] = useState([]);
  // const [filteredJobs, setFilteredJobs] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(() => {
  //   const fetchSkillSet = async () => {
  //     const response = await INSTANCE.post("/jobs/skillset", {});
  //     setSkillsData(response.data);
  //   };
  //   fetchSkillSet();
  // }, []);

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
      setMaxCandidates(parseInt(value));
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsMaxChecked(isChecked);

    if (isChecked) {
      setValue("maxCandidates", 100);
    } else {
      setValue("maxCandidates", maxCandidates || "");
    }

    clearErrors("maxCandidates");
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
                          Job Title <span className=" text-danger">*</span>
                        </span>
                      </H6>
                      {/* <input
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
                      /> */}
                      <JobTitleAutocomplete
                        value={jobName}
                        onChange={setJobName}
                        error={fieldErrors?.["jobTitle"]?.isEmpty}
                        register={register}
                        clearErrors={clearErrors}
                      />
                      <div className="invalid-feedback text-start">
                        {errors.jobName?.message}
                      </div>
                    </div>
                  </Col>
                  {/* <Col xl="4">
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
                  </Col> */}
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
                        <span
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            marginTop: "4px",
                          }}
                        >
                          Skills <span className=" text-danger">*</span>
                        </span>
                      </H6>
                      <SkillsAutocomplete
                        skills={skills}
                        setSkills={setSkills}
                        skillInputValue={skillInputValue}
                        setSkillInputValue={setSkillInputValue}
                        register={register}
                        error={fieldErrors?.["skills"]?.isEmpty}
                        jobTitle={jobName}
                        clearErrors={clearErrors}
                      />

                      {/* {enterSkill ? (
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
                      )} */}
                      {skills.map((skill, index) => (
                        <div
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
                            style={{ cursor: "pointer" }}
                            strokeWidth={1.5}
                            size={16}
                            onClick={() => removeSkill(skill)}
                          />
                        </div>
                      ))}
                      <div className="invalid-feedback">
                        {errors.skillInputValue?.message}
                      </div>
                    </FormGroup>
                  </Col>

                  <Col xl="12" className="mt-0">
                    <FormGroup style={{ textAlign: "center" }}>
                      {/* <span
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
                      </span> */}

                      <div className="mt-2">
                        <H6
                          attrH6={{
                            className:
                              "d-flex justify-content-between align-items-center",
                          }}
                        >
                          {!linkedInSearchButton ? (
                            <>
                              <span
                                style={{
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  marginBottom: "0px",
                                }}
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
                                style={{
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  marginBottom: "0px",
                                }}
                              >
                                Copy the{" "}
                                <span style={{ color: "#1264FD" }}>
                                  LinkedIn URL
                                </span>
                                and paste it below{" "}
                                <span className="text-danger">*</span>
                              </span>
                            </>
                          )}
                          <div>
                            <div
                              onClick={openModal}
                              style={{
                                cursor: "pointer",
                                // padding: "8px 15px",
                                // backgroundColor: "#1264FD",
                                color: "#1264FD",
                                borderRadius: "5px",
                                display: "inline-block",
                                fontWeight: "500",
                                fontSize: "12px",
                                // marginBottom: "10px",
                              }}
                            >
                              How to Get URL
                            </div>

                            {/* Modal */}
                            <ImageModal
                              isOpen={isModalOpen}
                              onRequestClose={closeModal}
                            />
                          </div>
                        </H6>
                        {linkedInSearchButton ? (
                          <>
                            <div style={{ position: "relative" }}>
                              <input
                                style={{
                                  border: fieldErrors?.["linkedinUrl"]?.isEmpty
                                    ? ".1px solid #f2abab"
                                    : linkedInSearch
                                    ? "1px solid #efefef"
                                    : ".1px solid #efefef",
                                  background: "#EBF1FC",
                                  marginRight: "3px",
                                  paddingRight: "35px",
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
                                  <span
                                    style={{
                                      // border: "1px solid #1264FD",
                                      padding: "6px 0",
                                      position: "absolute",
                                      right: "10px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      width: "50px",
                                      height: "30px",
                                      background:
                                        "linear-gradient(to right,rgba(235, 241, 252, 0), #ebf1fc, #ebf1fc)",
                                    }}
                                  >
                                    <FaCheck
                                      style={{
                                        color: "green",
                                        float: "right",
                                      }}
                                    />
                                  </span>
                                )}
                              {fieldErrors?.["linkedinUrl"]?.isEmpty && (
                                <div className="invalid-feedback text-start ">
                                  {/* {errors.linkedInSearch.message} */}{" "}
                                  required
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
                    {linkedInSearchValue && !hasErrors && (
                      <div className="text-start" style={{ color: "#595959" }}>
                        {/* <p style={{ fontSize: "12px" }}>
                          LinkedIn profile found: <strong>{"1000+"}</strong>
                        </p> */}
                        <p
                          style={{
                            fontSize: "12px",
                            marginBottom: "4px",
                            paddingTop: "4px",
                          }}
                        >
                          How many users you would like to add to this list?{" "}
                          <span className=" text-danger">
                            *{" "}
                            <strong style={{ color: "#9F9B9B" }}>
                              (max 100)
                            </strong>
                          </span>
                        </p>
                        <div>
                          <div className="d-flex gap-3">
                            <span>
                              <div>
                                <input
                                  style={{
                                    border: fieldErrors?.["maxCandidates"]
                                      ?.isEmpty
                                      ? ".1px solid #f2abab"
                                      : maxCandidates
                                      ? "1px solid #efefef"
                                      : "1px solid #efefef",
                                    background: "#EBF1FC",
                                    marginRight: "3px",
                                    width: "60px",
                                    height: "14px",
                                    display: "inline-block",
                                    appearance: "none",
                                    MozAppearance: "textfield",
                                    WebkitAppearance: "none",
                                  }}
                                  min={1}
                                  max={100}
                                  readOnly={isMaxChecked}
                                  type="number"
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
                      </div>
                    )}
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
