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
  const [jobStats, setJobStats] = useState(null);
  const [error, setError] = useState(null);

  const getJobDetails = () => {
    const url = `/jobs/${id}`;

    const handleJobDetailsResponse = (resp) => {
      if (resp?.status === 200) {
        const result = resp.data;
        setJobDetails(result);

        // Conditional logic based on result
        if (!result.isJobCompleted) {
          const step = result.isJobSequenceSet === true ? "3" : "2";
          navigate(`/jobs/create?jobId=${id}&step=${step}`);
        }

        // Call another API (/jobs/${id}/stats)
        fetchJobStats();
      } else {
        const err = resp?.message;
        toast.error(err);
      }
    };

    const fetchJobStats = () => {
      const statsUrl = `/jobs/${id}/stats`;

      const handleJobStatsResponse = (statsResp) => {
        if (statsResp?.status === 200) {
          const statsData = statsResp.data;
          setJobStats(statsData);
        } else {
          const statsErr = statsResp?.message;
          toast.error(statsErr);
        }
      };

      dispatch(fetchJobDetails(statsUrl, handleJobStatsResponse));
    };

    dispatch(fetchJobDetails(url, handleJobDetailsResponse));
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  useEffect(() => {
    getJobDetails();
  }, [dispatch, id]);

  console.log({ jobDetails });
  console.log({ jobStats });

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
              <Col xl="12" className="col-ed-5 box-col-5 p-0">
                <Row className=" ">
                  <Col className="   ">
                    <PotentialCandidates Message={jobStats?.message} />
                  </Col>
                  <Col className="   ">
                    <BlackList Connection={jobStats?.connection} />
                  </Col>
                  {/* <Col className="  priority">
                    <Priority jobDetails={jobDetails} />
                  </Col> */}
                </Row>
              </Col>
              <Col xl="12" className="col-ed-5 box-col-5">
                <Row>
                  {/* <Col xl="4" md="4">
                    <GenderGraph />
                  </Col> */}
                  <Col
                    xl="6"
                    md="6"
                    style={{
                      backgroundColor: "#fff",
                      height: "95%",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <TopCandidate id={jobDetails.id} />
                    {/* <CandidatesByCity CityStatsData={jobStats?.byState} /> */}
                  </Col>
                  <Col xl="6" md="6">
                    <AvgExp
                      AvgExpStatsData={jobStats?.byExperience}
                      avgExperience={jobStats?.avgExperience}
                    />
                  </Col>
                </Row>
              </Col>
              <Col
                xl="12"
                className="col-ed-5 box-col-5"
                style={{ marginBottom: "30px" }}
              >
                <Row>
                  <Col xl="6" md="6">
                    <CandidateFunnel
                      CandidateFunnel={jobStats?.candidateFunnel}
                    />
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
