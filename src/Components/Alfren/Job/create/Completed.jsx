import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import completedJob from "../../../../assets/used-files/images/completedJob.svg";
import { Link, useNavigate } from "react-router-dom";
import JobProcessOverview from "./StepThree/JobProcessOverview";
import { useDispatch } from "react-redux";
import { updateJob } from "../../../../redux/Job/jobActions";
import { toast } from "react-toastify";

const Completed = ({ handlePrevious, jobId, messageBody, category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigate("/Jobs");
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
          // handleNext(e);
          handleGoBack();
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };

  return (
    <Fragment>
      <Container
        fluid={true}
        style={{ paddingBottom: "100px", textAlign: "center" }}
      >
        {/* Job Process Overview Section */}
        <Row>
          <Col sm="12" className="">
            <JobProcessOverview />
          </Col>
        </Row>
        {/* <Row>
          <Col sm="12" className="">
            <Image attrImage={{ src: completedJob }} />
          </Col>
        </Row> */}
        {/* Go Back Button */}
        <Row>
          <Col sm="12" className="">
            {/* <Button
              color="primary"
              onClick={handlePrevious}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                borderRadius: "5px",
              }}
            >
              Back to selection Criteria
            </Button> */}
            <Link
              onClick={handlePrevious}
              className="btn btn-outline-light me-3 bg-white"
               style={{ padding: "12px 12px", fontSize: "16px" }}
            >
              <span>Back to selection Criteria</span>
            </Link>
            <Button
              color="primary"
              // onClick={handleGoBack}
              onClick={submitStepThree}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                borderRadius: "5px",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fa fa-spinner fa-spin" /> Loading...
                </>
              ) : (
                "Start head Hunting"
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Completed;
