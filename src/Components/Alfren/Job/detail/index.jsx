import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-feather";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchJobDetails } from "../../../../redux/Job/jobActions";
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
import { Input, Media, Label, Tooltip } from "reactstrap";
import { BiSolidCheckbox } from "react-icons/bi";

import { TfiBackLeft } from "react-icons/tfi";

const experienceData = {
  category: [0, 1, 2, 3, 4, 5],
  values: [10, 20, 35, 25, 15, 5],
};

const cityData = [
  { id: "PK-BA", value: 25 },
  { id: "PK-PB", value: 50 },
  { id: "PK-SD", value: 40 },
  { id: "PK-KP", value: 30 },
  { id: "PK-IS", value: 20 },
  { id: "PK-TA", value: 10 },
  { id: "PK-JK", value: 15 },
  { id: "PK-GB", value: 5 },
];

const JobDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [jobStats, setJobStats] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [experienceData, setExperienceData] = useState({
    category: [],
    values: [],
  });
  useEffect(() => {
    if (jobStats?.byExperience) {
      const category = jobStats.byExperience.map((item) => item.years);
      const values = jobStats.byExperience.map((item) => item.count);
      setExperienceData({ category, values });
    }
  }, [jobStats]);

  const getJobDetails = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching job details for ID:", id);
      const url = `/jobs/${id}`;
      const statsUrl = `/jobs/${id}/stats`;

      const handleJobDetailsResponse = (resp) => {
        if (resp?.status === 200) {
          const result = resp.data;
          setJobDetails(result);
          if (!result.isJobCompleted) {
            const step = result.isJobSequenceSet === true ? "3" : "2";
            toast.info("Job incomplete, redirecting...");
            setTimeout(() => {
              navigate(`/jobs/create?jobId=${id}&step=${step}`);
            }, 1000);
          }
        } else {
          console.error("Job details error:", resp?.message);
          setError(resp?.message || "Failed to fetch job details");
          toast.error(resp?.message || "Failed to fetch job details");
        }
      };

      const handleJobStatsResponse = (statsResp) => {
        if (statsResp?.status === 200) {
          setJobStats(statsResp.data);
        } else {
          console.error("Job stats error:", statsResp?.message);
          toast.error(statsResp?.message || "Failed to fetch job stats");
        }
      };

      await Promise.all([
        dispatch(fetchJobDetails(url, handleJobDetailsResponse)),
        dispatch(fetchJobDetails(statsUrl, handleJobStatsResponse)),
      ]);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message || "Failed to fetch job details");
      toast.error(err.message || "Failed to fetch job details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getJobDetails();
    } else {
      setError("Invalid job ID");
      toast.error("Invalid job ID");
    }
  }, [dispatch, id]);

  console.log({ jobDetails });

  const [isActive, setIsActive] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  return (
    <Fragment>
      {jobDetails && (
        <Container fluid={true}>
          <div className="user-profile mt-4">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 400,
                  marginBottom: "6px",
                }}
              >
                {jobDetails.name}
                <span
                  style={{
                    color: "#1264FD",
                    cursor: "pointer",
                    paddingLeft: "6px",
                  }}
                >
                  {/* <Link to={jobDetails.linkedInSearchURL} size={20} strokeWidth={2} aria-label="Job Link" /> */}
                  <a
                    href={jobDetails.linkedInSearchURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Job Link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Link
                      to={jobDetails.linkedInSearchURL}
                      size={20}
                      strokeWidth={2}
                      aria-label="Job Link"
                    />
                  </a>
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                  marginTop: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    marginTop: "6px",
                    alignItems: "center",
                  }}
                >
                  <span>Active</span>

                  {/* Tooltip to show the active/inactive state */}
                  <Label
                    className="switch"
                    id="switchTooltip"
                    style={{ cursor: "pointer" }}
                  >
                    <Input
                      type="checkbox"
                      checked={isActive}
                      onChange={toggleSwitch}
                      style={{
                        background: isActive ? "darkred" : "#E0E0E0",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      className="switch-state"
                      style={{
                        backgroundColor: isActive ? "darkred" : "#E0E0E0",
                      }}
                    ></span>
                  </Label>

                  <Tooltip
                    placement="top"
                    isOpen={tooltipOpen}
                    target="switchTooltip"
                    toggle={toggleTooltip}
                  >
                    {isActive
                      ? "Headhunting is in progress."
                      : "The job is paused, activate the job to resume headhunting."}
                  </Tooltip>
                </div>

                <button
                  onClick={() => navigate(`/jobs`)}
                  className="btn btn-primary px-3"
                  style={{
                    backgroundColor: "#1264FD",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      paddingRight: "6px",
                    }}
                  >
                    Back To Jobs
                  </span>

                  <TfiBackLeft strokeWidth={0.5} size={16} />
                </button>
              </div>
            </div>
            <Row>
              <Col xl="12" className="col-ed-5 box-col-5 p-0">
                <Row>
                  <Col xl="6" md="6">
                    <BlackList Connection={jobStats?.connection} />
                  </Col>
                  <Col xl="6" md="6">
                    <PotentialCandidates Message={jobStats?.message} />
                  </Col>

                  {/* <Col xl="4" md="6">
                    <Priority jobDetails={jobDetails} />
                  </Col> */}
                </Row>
              </Col>
              <Col xl="12" className="col-ed-5 box-col-5 p-0">
                <Row>
                  <Col xl="6" md="6">
                    <TopCandidate id={jobDetails.id} />
                  </Col>
                  <Col xl="6" md="6">
                    <AvgExp
                      AvgExpStatsData={experienceData}
                      avgExperience={jobStats?.avgExperience}
                    />
                  </Col>
                  {/* <Col xl="4" md="6">
                    <ResponseRate stats={jobStats} />
                  </Col> */}
                </Row>
              </Col>
              <Col xl="12" className="col-ed-5 box-col-5 p-0">
                <Row>
                  <Col xl="6" md="6">
                    <CandidatesByCity CityStatsData={jobStats?.byState} />
                  </Col>
                  <Col xl="6" md="6">
                    <RequiredSkills jobDetails={jobDetails} />
                  </Col>

                  {/* <Col xl="4" md="6">
                    <CandidateFunnel
                      CandidateFunnel={jobStats?.candidateFunnel}
                    />
                  </Col> */}
                </Row>
              </Col>
              {/* <Col
                xl="12"
                className="col-ed-5 box-col-5"
                style={{ marginBottom: "30px" }}
              >
                <Row>
                  <Col xl="12" md="12">
                   <GenderGraph stats={jobStats?.byGender} />
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default JobDetail;
