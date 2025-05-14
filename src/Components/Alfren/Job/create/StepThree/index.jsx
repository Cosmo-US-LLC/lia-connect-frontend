import React, { Fragment, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Tooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import { updateJob } from "../../../../../redux/Job/jobActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { GiMagnifyingGlass, GiCrossedSwords, GiBullseye } from "react-icons/gi";
import JobProcessOverview from "./JobProcessOverview";

const StepThree = ({
  handlePrevious,
  handleNext,
  candidateHaveDisplay,
  setCandidateHaveDisplay,
  candidateHaveOpenProfile,
  setCandidateHaveOpenProfile,
  candidateInOtherJob,
  setCandidateInOtherJob,
  jobId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageBody, setMessageBody] = useState(
    "Hi, I came across your profile on LinkedIn and found your experience quite impressive. I believe you could be a great fit for one of our open positions. Let's connect and discuss this opportunity further."
  );
  const [category, setCategory] = useState("Intermediate");
  const [tooltipOpen, setTooltipOpen] = useState({
    Broad: false,
    Intermediate: false,
    Precise: false,
  });

  const dispatch = useDispatch();

  const handleBackStep = (e) => {
    e.preventDefault(e);
    handlePrevious(e);
  };

  const handleNextStep = (e) => {
    e.preventDefault(e);
    submitStepThree(e);
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setMessageBody(value);
    }
  };

  const submitStepThree = async (e) => {
    setIsLoading(true);
    const formData = {
      jobId,
      body: {
        // candidateHaveDisplay: true,
        // candidateHaveOpenProfile: true,
        // candidateInOtherJob: false,
        isJobCompleted: true,
        messageBody,
        candidateSelectionType: category,
      },
    };
    dispatch(
      updateJob(formData, (resp) => {
        setIsLoading(false);
        if (resp.status === 201) {
          toast.success("Job Added Successfully");
          handleNext(e);
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };

  const categories = [
    {
      title: "Broad",
      icon: <GiMagnifyingGlass size={30} color="#007bff" />,
      description:
        "Casts a wide net, accepting more candidates with diverse skills.",
      note: "Lower skill match threshold - Suitable for early-stage roles.",
    },
    {
      title: "Intermediate",
      icon: <GiCrossedSwords size={30} color="#ffc107" />,
      description:
        "A balanced approach with moderate skill match requirements.",
      note: "Moderate skill match threshold - Ideal for mid-level roles.",
    },
    {
      title: "Precise",
      icon: <GiBullseye size={30} color="#dc3545" />,
      description: "Targets only the most precisely matched candidates.",
      note: "High skill match threshold - Best for specialised roles.",
    },
  ];

  const toggleTooltip = (categoryTitle) => {
    setTooltipOpen((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  };

  return (
    <Fragment>
      <Container fluid={true} style={{ width: "80%" }}>
        <Row style={{ justifyContent: "center" }}>
          <Col xl="8" className="mt-5">
            <Card>
              <CardBody>
                {/* Category Selection */}
                <Row>
                  <Col xl="12" className="mb-4">
                    <h6 style={{ fontWeight: "600", marginBottom: "10px" }}>
                      Candidate Selection Criteria{" "}
                      <span className="text-danger">*</span>
                    </h6>
                    <div className="d-flex gap-3">
                      {categories.map((cat) => (
                        <div
                          key={cat.title}
                          id={`category-${cat.title}`}
                          onClick={() => setCategory(cat.title)}
                          className={`p-4 rounded-3 text-center ${
                            category === cat.title
                              ? "border-primary bg-light"
                              : "border-muted bg-white"
                          }`}
                          style={{
                            flex: 1,
                            cursor: "pointer",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            transition: "all 0.2s ease",
                            boxShadow:
                              category === cat.title
                                ? "0 4px 20px rgba(0, 123, 255, 0.2)"
                                : "0 2px 10px rgba(0,0,0,0.05)",
                          }}
                        >
                          {cat.icon}
                          <h6
                            style={{
                              fontWeight: "600",
                              marginTop: "10px",
                              color:
                                category === cat.title ? "#007bff" : "#333",
                            }}
                          >
                            {cat.title}
                          </h6>
                          <p
                            style={{
                              fontSize: "13px",
                              color:
                                category === cat.title ? "#007bff" : "#666",
                            }}
                          >
                            {cat.description}
                          </p>
                          <span
                            style={{
                              fontSize: "12px",
                              color:
                                category === cat.title ? "#0056b3" : "#888",
                              fontWeight: "500",
                            }}
                          >
                            {cat.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>

                {/* Message Input */}
                <Row>
                  <Col xl="12" className="mb-4 mt-4">
                    <FormGroup>
                      <Label for="messageBody" style={{ fontWeight: "600" }}>
                        Message to Candidate (10 to 500 characters){" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <textarea
                        id="messageBody"
                        name="messageBody"
                        value={messageBody}
                        onChange={handleMessageChange}
                        placeholder="Write a message to the candidate..."
                        rows="5"
                        className="form-control shadow-none"
                        style={{
                          borderColor:
                            messageBody.length < 10 ? "#f2abab" : "#efefef",
                        }}
                      />
                      <div
                        className="text-end"
                        style={{ fontSize: "12px", color: "#595959" }}
                      >
                        {messageBody.length} / 500 characters
                      </div>
                      {messageBody.length < 10 && (
                        <div className="text-danger text-start">
                          Message must be at least 10 characters.
                        </div>
                      )}
                    </FormGroup>
                  </Col>

                  <Col xl="12" style={{ textAlign: "center" }}>
                    <Link
                      onClick={handleBackStep}
                      className="btn btn-outline-light pe-5 ps-5 pt-2 pb-2 me-3"
                    >
                      <span>Back to Job Details</span>
                    </Link>
                    <Link
                      onClick={handleNextStep}
                      className="btn btn-primary pe-5 ps-5 pt-2 pb-2"
                      disabled={
                        messageBody.length < 10 ||
                        messageBody.length > 500 ||
                        isLoading
                      }
                    >
                      {isLoading ? (
                        <>
                          <i className="fa fa-spinner fa-spin" /> Loading...
                        </>
                      ) : (
                        "Complete"
                      )}
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
