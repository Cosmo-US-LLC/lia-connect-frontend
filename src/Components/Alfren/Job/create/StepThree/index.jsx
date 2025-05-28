import { Fragment, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GiMagnifyingGlass, GiCrossedSwords, GiBullseye } from "react-icons/gi";

const StepThree = ({
  handlePrevious,
  handleNext,
  jobId,
  messageBody,
  setMessageBody,
  category,
  setCategory,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackStep = (e) => {
    e.preventDefault();
    handlePrevious(e);
  };

  const handleNextStep = async (e) => {
    e.preventDefault();

    if (messageBody.length < 10 || messageBody.length > 500) {
      toast.error("Message must be between 10 and 500 characters");
      return;
    }

    if (!category) {
      toast.error("Please select a candidate selection criteria");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const formData = {
        jobId,
        body: {
          isJobCompleted: true,
          messageBody,
          candidateSelectionType: category,
        },
      };

      toast.success("Job Added Successfully");
      handleNext(e);
    } catch (error) {
      toast.error("Failed to save job settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setMessageBody(value);
    }
  };

  const categories = [
    {
      title: "Comprehensive Search",
      icon: <GiMagnifyingGlass size={42} color="#007bff" />,
      description:
        "Captures a broad spectrum of candidates with diverse skill sets.",
      note: [
        "Lower skill match threshold",
        "Targets a wider range of candidates",
      ],
    },
    {
      title: "Targeted Evaluation",
      icon: <GiCrossedSwords size={42} color="#ffc107" />,
      description:
        "Balances selectivity with flexibility, focusing on candidates who meet moderate skill requirements and experience.",
      note: [
        "Moderate skill match threshold",
        "Targets a moderate range of candidates",
      ],
    },
    {
      title: "Precision Screening",
      icon: <GiBullseye size={42} color="#dc3545" />,
      description:
        "Focuses exclusively on candidates who meet the highest skill match criteria according to your requirements.",
      note: ["High skill match threshold", "Targets top candidates only"],
    },
  ];

  const isFormValid =
    messageBody.length >= 10 && messageBody.length <= 500 && category;

  return (
    <Fragment>
      <Container fluid>
        <Row style={{ justifyContent: "center" }}>
          <Col xl="12" lg="12">
            <Card>
              <CardBody>
                {/* Category Selection */}
                <Row>
                  <Col xl="12">
                    <h6
                      style={{
                        fontSize: "30px",
                        fontWeight: "600",
                        marginBottom: "26px",
                      }}
                    >
                      Candidate Selection Criteria
                    </h6>
                    <div className="d-flex gap-3 pb-4 flex-wrap">
                      {categories.map((cat) => (
                        <div
                          key={cat.title}
                          id={`category-${cat.title}`}
                          onClick={() => setCategory(cat.title)}
                          className={`p-4 rounded-3 text-center ${
                            category === cat.title
                              ? "border-primary bg-light"
                              : "bg-white"
                          }`}
                          style={{
                            flex: 1,
                            minWidth: "280px",
                            cursor: "pointer",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            transition: "all 0.2s ease",
                            border:
                              category === cat.title
                                ? "2px solid #007bff"
                                : "2px solid #e9ecef",
                            boxShadow:
                              category === cat.title
                                ? "0 4px 20px rgba(0, 123, 255, 0.2)"
                                : "0 2px 10px rgba(0,0,0,0.05)",
                          }}
                        >
                          <div className="mb-3">{cat.icon}</div>
                          <h6
                            style={{
                              fontWeight: "600",
                              marginTop: "10px",
                              textAlign: "left",
                              color:
                                category === cat.title ? "#007bff" : "#333",
                            }}
                          >
                            {cat.title}
                          </h6>
                          <p
                            style={{
                              fontSize: "14px",
                              textAlign: "left",
                              color:
                                category === cat.title ? "#007bff" : "#000",
                              lineHeight: "1.2",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {cat.description}
                          </p>
                          <ul
                            className="list-unstyled mt-3"
                            style={{ textAlign: "left" }}
                          >
                            {cat.note.map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  fontSize: "12px",
                                  color:
                                    category === cat.title ? "#007bff" : "#000",
                                  // marginBottom: "4px",
                                  lineHeight: "1.7",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "4px",
                                    height: "4px",
                                    backgroundColor:
                                      category === cat.title
                                        ? "#007bff"
                                        : "#000",
                                    borderRadius: "50%",
                                    marginRight: "8px",
                                  }}
                                ></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>

                {/* Message Input */}
                <Row>
                  <Col xl="12" className="mb-4 mt-4">
                    <FormGroup>
                      <Label
                        for="messageBody"
                        style={{
                          fontWeight: "600",
                          textAlign: "left",
                          width: "100%",
                          fontSize: "16px",
                        }}
                      >
                        Message to Candidate (10 to 500 characters)
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
                            messageBody.length < 10 && messageBody.length > 0
                              ? "#dc3545"
                              : "#ced4da",
                          color: "#495057",
                          fontSize: "14px",
                        }}
                      />
                      <div
                        className="text-end mt-2"
                        style={{ fontSize: "12px", color: "#6c757d" }}
                      >
                        {messageBody.length} / 500 characters
                      </div>
                      {messageBody.length < 10 && messageBody.length > 0 && (
                        <div
                          className="text-danger text-start mt-1"
                          style={{ fontSize: "12px" }}
                        >
                          Message must be at least 10 characters.
                        </div>
                      )}
                    </FormGroup>
                  </Col>

                  <Col
                    xl="12"
                    style={{ textAlign: "center", marginBottom: "50px" }}
                  >
                    <Link
                      onClick={handleBackStep}
                      className="btn btn-outline-secondary pe-5 ps-5 pt-2 pb-2 me-3"
                      style={{ textDecoration: "none" }}
                    >
                      <span>Back to Job Details</span>
                    </Link>
                    <Link
                      onClick={handleNextStep}
                      className={`btn btn-primary pe-5 ps-5 pt-2 pb-2 ${
                        !isFormValid || isLoading ? "disabled" : ""
                      }`}
                      style={{
                        textDecoration: "none",
                        pointerEvents:
                          !isFormValid || isLoading ? "none" : "auto",
                        opacity: !isFormValid || isLoading ? 0.6 : 1,
                      }}
                    >
                      {isLoading ? (
                        <>
                          <i className="fa fa-spinner fa-spin me-2" />
                          Loading...
                        </>
                      ) : (
                        "Continue"
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
