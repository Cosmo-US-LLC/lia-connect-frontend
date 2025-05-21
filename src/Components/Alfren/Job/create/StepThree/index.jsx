// import React, { Fragment, useState } from "react";
// import { Container, Row, Col, Card, CardBody, FormGroup, Label } from "reactstrap";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { GiMagnifyingGlass, GiCrossedSwords, GiBullseye } from "react-icons/gi";
// import { updateJob } from "../../../../../redux/Job/jobActions";
// import "./JobProcessOverview.css";

// const StepThree = ({ handlePrevious, handleNext, jobId }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [messageBody, setMessageBody] = useState(
//     "Hi, I came across your profile on LinkedIn and found your experience quite impressive. I believe you could be a great fit for one of our open positions. Let's connect and discuss this opportunity further."
//   );
//   const [category, setCategory] = useState("Intermediate");

//   const dispatch = useDispatch();

//   const categories = [
//     {
//       title: "Broad",
//       icon: <GiMagnifyingGlass size={30} color="#007bff" />,
//       description: "Casts a wide net, accepting more candidates with diverse skills.",
//       note: "Lower skill match threshold - Suitable for early-stage roles.",
//     },
//     {
//       title: "Intermediate",
//       icon: <GiCrossedSwords size={30} color="#ffc107" />,
//       description: "A balanced approach with moderate skill match requirements.",
//       note: "Moderate skill match threshold - Ideal for mid-level roles.",
//     },
//     {
//       title: "Precise",
//       icon: <GiBullseye size={30} color="#dc3545" />,
//       description: "Targets only the most precisely matched candidates.",
//       note: "High skill match threshold - Best for specialised roles.",
//     },
//   ];

//   const handleMessageChange = (e) => {
//     const value = e.target.value;
//     if (value.length <= 500) {
//       setMessageBody(value);
//     }
//   };

//   const submitStepThree = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = {
//       jobId,
//       body: {
//         isJobCompleted: true,
//         messageBody,
//         candidateSelectionType: category,
//       },
//     };
//     dispatch(
//       updateJob(formData, (resp) => {
//         setIsLoading(false);
//         if (resp.status === 200 || resp.status === 201) {
//           toast.success("Job Added Successfully");
//           handleNext(e);
//         } else {
//           toast.error(resp.message);
//         }
//       })
//     );
//   };

//   return (
//     <Fragment>
//       <Container fluid>
//         <Row className="justify-content-center">
//           <Col xl="10" lg="12" className="my-3">
//             <Card className="border-0 shadow-sm">
//               <CardBody className="p-4">
//                 <Row >
//                   <Col xs="12" >
//                     <h6 className="fw-bold mb-3">
//                       Candidate Selection Criteria <span className="text-danger">*</span>
//                     </h6>
//                     <div className="d-flex gap-3 flex-wrap">
//                       {categories.map((cat) => (
//                         <div
//                           key={cat.title}
//                           role="button"
//                           tabIndex={0}
//                           onClick={() => setCategory(cat.title)}
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter" || e.key === " ") {
//                               setCategory(cat.title);
//                             }
//                           }}
//                           className={`category-card ${category === cat.title ? "selected" : ""}`}
//                         >
//                           {cat.icon}
//                           <h6 className={category === cat.title ? "text-primary" : ""}>
//                             {cat.title}
//                           </h6>
//                           <p className={category === cat.title ? "text-primary" : ""}>
//                             {cat.description}
//                           </p>
//                           <span className={category === cat.title ? "text-primary" : ""}>
//                             {cat.note}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </Col>
//                 </Row>

//                 <Row className="mt-4">
//                   <Col xs="12">
//                     <FormGroup>
//                       <Label for="messageBody" className="fw-bold">
//                         Message to Candidate (10 to 500 characters){" "}
//                         <span className="text-danger">*</span>
//                       </Label>
//                       <textarea
//                         id="messageBody"
//                         name="messageBody"
//                         value={messageBody}
//                         onChange={handleMessageChange}
//                         placeholder="Write a message to the candidate..."
//                         rows="5"
//                         className="form-control shadow-none"
//                         aria-label="Message to candidate"
//                         style={{
//                           borderColor: messageBody.length < 10 ? "#f2abab" : "#efefef",
//                         }}
//                       />
//                       <div className="text-end text-muted small mt-1">
//                         {messageBody.length} / 500 characters
//                       </div>
//                       {messageBody.length < 10 && (
//                         <div className="text-danger small mt-1" aria-live="polite">
//                           Message must be at least 10 characters.
//                         </div>
//                       )}
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col xs="12" className="text-center mt-4">
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handlePrevious(e);
//                       }}
//                       className="btn btn-outline-light px-5 py-2 me-3"
//                     >
//                       Back to Job Details
//                     </button>
//                     <button
//                       onClick={submitStepThree}
//                       className="btn btn-primary px-5 py-2"
//                       disabled={messageBody.length < 10 || messageBody.length > 500 || isLoading}
//                     >
//                       {isLoading ? (
//                         <>
//                           <i className="fa fa-spinner fa-spin" /> Loading...
//                         </>
//                       ) : (
//                         "Complete"
//                       )}
//                     </button>
//                   </Col>
//                 </Row>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </Fragment>
//   );
// };

// export default StepThree;

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
  messageBody, 
  setMessageBody,
  category,
  setCategory
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
    handleNext(e);
    // submitStepThree(e);
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
      title: "Comprehensive Search",
      icon: <GiMagnifyingGlass size={30} color="#007bff" />,
      description:
        "Captures a broad spectrum of candidates with diverse skill sets.",
        // "Casts a wide net, accepting more candidates with diverse skills.",
      note: ["Lower skill match threshold", "Targets a wider range of candidates"],
    },
    {
      title: "Targeted Evaluation",
      icon: <GiCrossedSwords size={30} color="#ffc107" />,
      description:
        // "A balanced approach with moderate skill match requirements.",
        "Balances selectivity with flexibility, focusing on candidates who meet moderate skill requirements and experience.",
      note: ["Moderate skill match threshold", "Targets a moderate range of candidates"],
    },
    {
      title: "Precision Screening",
      icon: <GiBullseye size={30} color="#dc3545" />,
      // description: "Targets only the most precisely matched candidates.",
      description: "Focuses exclusively on candidates who meet the highest skill match criteria according to your requirements.",
      note: ["High skill match threshold", "Targets top candidates only"],
    },
  ];

  // const categories = [
  //   {
  //     title: "Broad",
  //     icon: <GiMagnifyingGlass size={30} color="#007bff" />,
  //     description:
  //       "Casts a wide net, accepting more candidates with diverse skills.",
  //     note: "Lower skill match threshold - Suitable for early-stage roles.",
  //   },
  //   {
  //     title: "Intermediate",
  //     icon: <GiCrossedSwords size={30} color="#ffc107" />,
  //     description:
  //       "A balanced approach with moderate skill match requirements.",
  //     note: "Moderate skill match threshold - Ideal for mid-level roles.",
  //   },
  //   {
  //     title: "Precise",
  //     icon: <GiBullseye size={30} color="#dc3545" />,
  //     description: "Targets only the most precisely matched candidates.",
  //     note: "High skill match threshold - Best for specialised roles.",
  //   },
  // ];

  const toggleTooltip = (categoryTitle) => {
    setTooltipOpen((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  };

  return (
    <Fragment>
      <Container fluid>
        <Row style={{ justifyContent: "center" }}>
          <Col xl="10" lg="12">
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
                      Candidate Selection Criteria{" "}
                      <span className="text-danger">*</span>
                    </h6>
                    <div className="d-flex gap-3 pb-4 ">
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
                            cursor: "pointer",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            transition: "all 0.2s ease",
                            border:
                              category === cat.title ? "1px solid #1264fd" : "1px solid lightgray",
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
                          <ul className="category-note">
                            {cat.note.map((item, index) => (
                              <li
                                key={index}
                                className={
                                  category === cat.title ? "text-primary" : ""
                                }
                              >
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

                  <Col
                    xl="12"
                    style={{ textAlign: "center", marginBottom: "50px" }}
                  >
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
                        "Continue"
                        // "Complete"
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
