import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import PotentialCandidates from "./PotentialCandidates";
import ResponseRate from "./ResponseRate";
import BlackList from "./BlackList";
import Priority from "./Priority";
import TopCandidate from "./TopCandidate";
import GenderGraph from "./GenderGraph";
import CandidatesByCity from "./CandidatesByCity";
import CandidateFunnel from "./CandidateFunnel";
import RequiredSkills from "./RequiredSkills";
import AvgExp from "./AvgExp";
import { Link } from "react-feather";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchJobDetails } from "../../../../redux/Job/jobActions";

const JobDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  const getJobDetails = () => {
    const url = `/jobs/${id}`;
    dispatch(
      fetchJobDetails(url, (resp) => {
        if (resp?.status == 200) {
          const result = resp.data;
          setJobDetails(result);
          if (!result.isJobCompleted) {
            navigate(
              "/jobs/create?jobId=" +
              id +
              "&step=" +
              (result.isJobSequenceSet === true ? "3" : "2")
            );
          }
        } else {
          const err = resp?.message;
          toast.error(err);
        }
      })
    );
  };

  useEffect(() => {
    getJobDetails();
  }, [dispatch, id]);

  return (
    <Fragment>
      {jobDetails && (
        <Container fluid={true}>
          <div className="user-profile mt-4">
            <p style={{ fontSize: "22px", fontWeight: 400 }}>
              {jobDetails.name}
              <span className="ms-3" style={{ color: "#1264FD" }}>
                <Link size={20} strokeWidth={2} />
              </span>
            </p>

            <Row>
              <Col xl="12" className="col-ed-5 box-col-5">
                <Row className="custom-row">
                  <Col className="custom-col potential-candidates">
                    <PotentialCandidates />
                  </Col>
                  <Col className="custom-col blacklist">
                    <BlackList />
                  </Col>
                  <Col className="custom-col priority">
                    <Priority jobDetails={jobDetails} />
                  </Col>
                </Row>
              </Col>
              <Col xl="12" className="col-ed-5 box-col-5">
                <Row>
                  <Col xl="5" md="5" className="top-candidate-scroll" style={{
                    background: "white",
                    maxHeight: "491px",
                    padding: "55px 27px"
                  }}>
                    <TopCandidate id={id} />
                  </Col>
                  <Col xl="7" md="7">
                    <Row>
                      {/* <Col xl="4" md="4">
                        <GenderGraph />
                      </Col> */}
                      <Col xl="6" md="6">
                        <CandidatesByCity />
                      </Col>
                      <Col xl="6" md="6">
                        <AvgExp />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xl="12" className="col-ed-5 box-col-5">
                <Row>
                  <Col xl="6" md="6">
                    <CandidateFunnel />
                  </Col>
                  <Col xl="6" md="6">
                    <RequiredSkills jobDetails={jobDetails} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </Fragment>
  );
};
export default JobDetail;
