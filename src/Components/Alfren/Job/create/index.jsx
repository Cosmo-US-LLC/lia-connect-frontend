import React, { Fragment, useState } from "react";
import { Container, Row, Col, Progress, Form } from "reactstrap";
import { Image, Progressbar } from "../../../../AbstractElements";
import { Circle } from "react-feather";
import StepActiveIcon from "../../../../assets/used-files/icons/stepActive.svg";
import StepInActiveIcon from "../../../../assets/used-files/icons/stepInActive.svg";
import StepCompletedIcon from "../../../../assets/used-files/icons/stepCompleted.svg";
import StepOne from "./StepOne/index";
import StepTwo from "./StepTwo/index";
import StepThree from "./StepThree/index";
import Completed from "./Completed";

const JobCreate = () => {
  const [step, setStep] = useState(2);
  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const removeSkill = (name) => {
    const updatedItems = skills.filter((item) => item !== name);
    setSkills(updatedItems);
  };

  //stepOne data
  const [jobName, setJobName] = useState(null);
  const [jobPriority, setJobPriority] = useState(null);
  const [skills, setSkills] = useState([]);
  const [linkedInSearch, setLinkedInSearch] = useState(null);
  const [linkedInProfile, setLinkedInProfile] = useState(null);

  //stepOne data end

  //stepTwo Data starts
  const [sequence, setSequence] = useState([]);
  //stepTwo Data ends

  return (
    <Fragment>
      <Container fluid={true}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "30vh",
            textAlign: "center",
          }}
        >
          <div style={{ width: "60%" }}>
            <Col style={{ display: "flex" }}>
              <div>
                <Image
                  attrImage={{
                    src:
                      step == 2 || step == 3 || step == 4
                        ? StepCompletedIcon
                        : StepActiveIcon,
                  }}
                />
              </div>
              <div style={{ width: "100%", marginTop: "9px" }}>
                <Progressbar
                  attrProgress={{
                    value: "100",
                    color:
                      step == 3 || step == 2 || step == 4
                        ? "stepActive"
                        : "stepInActive",
                    className: "sm-progress-bar  mb-0 ",
                  }}
                />
              </div>
              <div>
                {" "}
                <Image
                  attrImage={{
                    src:
                      step == 2
                        ? StepActiveIcon
                        : step == 3 || step == 4
                        ? StepCompletedIcon
                        : StepInActiveIcon,
                  }}
                />
              </div>
              <div style={{ width: "100%", marginTop: "9px" }}>
                <Progressbar
                  attrProgress={{
                    value: "100",
                    color:
                      step == 3 || step == 4 ? "stepActive" : "stepInActive",
                    className: "sm-progress-bar  mb-0",
                  }}
                />
              </div>
              <div>
                <Image
                  attrImage={{
                    src:
                      step == 3
                        ? StepActiveIcon
                        : step == 4
                        ? StepCompletedIcon
                        : StepInActiveIcon,
                  }}
                />
              </div>
            </Col>
          </div>
          <div style={{ width: "67%" }}>
            <Col style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  color:
                    step == 3 || step == 1 || step == 2 || step == 4
                      ? "#1264fd"
                      : "#e0e0e7",
                }}
              >
                Setup New Job
              </span>

              <span
                className="me-4"
                style={{
                  color:
                    step == 3 || step == 2 || step == 4 ? "#1264fd" : "#e0e0e7",
                }}
              >
                Set Sequence
              </span>

              <span
                style={{
                  color: step == 3 || step == 4 ? "#1264fd" : "#e0e0e7",
                }}
              >
                Complete
              </span>
            </Col>
          </div>
          <Form
            className="form theme-form"
            onSubmit={handleSubmit}
            style={{ width: "100%", margin: "0 10%" }}
          >
            {step === 1 && (
              <StepOne
                setJobName={setJobName}
                jobName={jobName}
                jobPriority={jobPriority}
                setJobPriority={setJobPriority}
                skills={skills}
                setSkills={setSkills}
                removeSkill={removeSkill}
                linkedInSearch={linkedInSearch}
                setLinkedInSearch={setLinkedInSearch}
                linkedInProfile={linkedInProfile}
                setLinkedInProfile={setLinkedInProfile}
                handleNext={handleNext}
              />
            )}
            {step === 2 && (
              <StepTwo
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                sequence={sequence}
                setSequence={setSequence}
              />
            )}
            {step === 3 && <StepThree />}
            {step === 4 && <Completed />}
          </Form>
        </div>
      </Container>
    </Fragment>
  );
};

export default JobCreate;
