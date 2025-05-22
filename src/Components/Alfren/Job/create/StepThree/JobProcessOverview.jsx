import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import {
  FaUserCheck,
  FaRobot,
  FaFilter,
  FaHandshake,
  FaEnvelopeOpenText,
  FaComments,
} from "react-icons/fa";
import "./JobProcessOverview.css";

const JobProcessOverview = () => {
  const steps1 = [
    {
      // title: "Candidate Search",
      title: "Fetch Candidates",
      icon: <FaUserCheck size={30} color="#1264FD" />,
      description: "Alfren fetches candidates based on your search criteria.",
    },
    {
      title: "Profile Scoring",
      icon: <FaRobot size={30} color="#FECF41" />,
      description:
        "Each candidate is scored based on their profile and the required skills.",
    },
    {
      // title: "Candidate Filtering",
      title: "Shortlist Candidates",
      icon: <FaFilter size={30} color="#dc3545" />,
      description: "Filters candidates based on your selected precision level.",
    },
  ];
  const steps2 = [
    {
      title: "Candidate Replies",
      icon: <FaComments size={30} color="#6C757D" />,
      description:
      "Monitors candidate responses to complete the hiring process.",
    },
    {
      title: "Message to Candidates",
      icon: <FaEnvelopeOpenText size={30} color="#17A2B8" />,
      description: "Sends a personalised message to connected candidates.",
    },
    {
      title: "Connection Requests",
      icon: <FaHandshake size={30} color="#28A745" />,
      description: "Sends connection requests to the most relevant candidates.",
    },
  ];

  return (
    <Row className="mb-4 justify-content-center">
      <Col xl="12" style={{ textAlign: "center" }}>
        <h5 style={{ fontWeight: "800", marginBottom: "24px" }}>
          Job Created - What Happens In The Background?
        </h5>
        <div className="job-process-container">
          {steps1.map((step, index) => (
            <div key={index} className="job-process-wrapper">
              <Card className="job-process-card">
                <CardBody className="text-center">
                  <div className="step-icon">{step.icon}</div>
                  <h6 className="step-title">{step.title}</h6>
                  <p className="step-description">{step.description}</p>
                </CardBody>
              </Card>
              {index < steps1.length - 1 && (index + 1) % 3 !== 0 && (
                <div className="arrow">
                  <span>&#10132;</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          className="d-flex justify-content-end"
          style={{ width: "1000px", margin: "0 auto", marginBottom: "24px" }}
        >
          <div className="arrow" style={{ transform: "rotate(90deg)" }}>
            <div className="text-center" style={{ width: "300px" }}>
              &#10132;
            </div>
          </div>
        </div>
        <div className="job-process-container">
          {steps2.map((step, index) => (
            <div key={index} className="job-process-wrapper">
              <Card className="job-process-card">
                <CardBody className="text-center">
                  <div className="step-icon">{step.icon}</div>
                  <h6 className="step-title">{step.title}</h6>
                  <p className="step-description">{step.description}</p>
                </CardBody>
              </Card>
              {index < steps2.length - 1 && (index + 1) % 3 !== 0 && (
                <div className="arrow" style={{ transform: "rotate(180deg)" }}>
                  <span>&#10132;</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default JobProcessOverview;
