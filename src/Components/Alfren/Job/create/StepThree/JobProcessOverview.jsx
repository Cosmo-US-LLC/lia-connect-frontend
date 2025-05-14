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
  const steps = [
    {
      title: "Candidate Search",
      icon: <FaUserCheck size={30} color="#1264FD" />,
      description: "Bot fetches candidates based on your search criteria.",
    },
    {
      title: "Profile Scoring",
      icon: <FaRobot size={30} color="#FECF41" />,
      description:
        "Each candidate is scored based on their profile and the required skills.",
    },
    {
      title: "Candidate Filtering",
      icon: <FaFilter size={30} color="#dc3545" />,
      description: "Filters candidates based on your selected precision level.",
    },
    {
      title: "Connection Requests",
      icon: <FaHandshake size={30} color="#28A745" />,
      description: "Sends connection requests to the most relevant candidates.",
    },
    {
      title: "Message to Candidates",
      icon: <FaEnvelopeOpenText size={30} color="#17A2B8" />,
      description: "Sends a personalised message to connected candidates.",
    },
    {
      title: "Candidate Replies",
      icon: <FaComments size={30} color="#6C757D" />,
      description:
        "Monitors candidate responses to complete the hiring process.",
    },
  ];

  return (
    <Row className="mb-4 justify-content-center">
      <Col xl="12" style={{ textAlign: "center" }}>
        <h5 style={{ fontWeight: "800", marginBottom: "24px", marginTop: "24px" }}>
         Job Created - What Happens In The Background?
        </h5>
        <div className="job-process-container">
          {steps.map((step, index) => (
            <div key={index} className="job-process-wrapper">
              <Card className="job-process-card">
                <CardBody className="text-center">
                  <div className="step-icon">{step.icon}</div>
                  <h6 className="step-title">{step.title}</h6>
                  <p className="step-description">{step.description}</p>
                </CardBody>
              </Card>
              {index < steps.length - 1 && (index + 1) % 3 !== 0 && (
                <div className="arrow">
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
