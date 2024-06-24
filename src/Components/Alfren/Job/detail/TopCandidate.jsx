import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Col, Media, Row } from "reactstrap";
import { CiCircleInfo } from "react-icons/ci";
import { fetchJobDetails } from "../../../../redux/Job/jobActions";
import { useDispatch } from "react-redux";
import { FiMessageSquare, FiUser } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { useNavigate } from "react-router";

const TopCandidate = ({ id }) => {
  const [topCandidateDetail, setJobDetails] = useState(null);
  const [hideScroll, setHideScroll] = useState(true); // State to control scrollbar visibility
  const [showInfoBox, setShowInfoBox] = useState(false); // State to control info box visibility
  const [topCandidateId, setGetTopCandidateId] = useState(null)
  console.log('topCandidateId', topCandidateId)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      const url = `/jobs/${id}/top-candidates`;
      dispatch(fetchJobDetails(url, handleFetchResponse));
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    if (topCandidateId) {
      const url = `/candidate/${topCandidateId}`;
      dispatch(fetchJobDetails(url, handleFetchResponse));
    }
  }, [dispatch, topCandidateId]);
  
  const handleFetchResponse = (resp) => {
    if (resp?.status === 200) {
      setJobDetails(resp.data);
      if (topCandidateId) {
        navigate(`/candidates/detail/${topCandidateId}`);
      }
    } else {
      toast.error(resp?.message);
    }
  };
  



  const handleGetId = (id) => {
    setGetTopCandidateId(id)
  }
  return (
    <Fragment>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 400,
          position: "relative",
          width: "100%",
          color: "#595959",
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Top Candidates
        <span
          style={{
            position: "absolute",
            bottom: "10px",
            left: "0",
            width: "12%",
            borderBottom: "1px solid #1264FD",
          }}
        ></span>
        <p style={{ color: '#819ACB' }}>
          Score
          <CiCircleInfo
            style={{ color: 'black', fontSize: 'large', position: 'relative', top: '5px', cursor: 'pointer', left: '1px' }}
            onMouseEnter={() => setShowInfoBox(true)}
            onMouseLeave={() => setShowInfoBox(false)}
          />
          {showInfoBox && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="info-box " onMouseEnter={() => setShowInfoBox(true)} onMouseLeave={() => setShowInfoBox(false)}>
              <img src="../../score-tip1.png" alt="Info Image 1" />
              <img src="../../score-tip2.png" alt="Info Image 2" />
              <img src="../../score-tip3.png" alt="Info Image 3" />
            </div>
          )}
        </p>
      </p>
      <div className={`candidate-container ${hideScroll ? "hide-scrollbar" : ""}`} style={{ maxHeight: "400px", overflowY: "auto" }}>
        {topCandidateDetail?.map((topCand, index) => {
          return (
            <>
              <Card
                onClick={() => handleGetId(topCand.id)}
                key={index}
                style={{
                  border: "1px solid #EBF1FC",
                  boxShadow: "3px 3px 3px 0px #BA9FC914",
                  marginBottom: "10px",
                  cursor: 'pointer'
                }}
              >
                <CardBody style={{ padding: "10px" }}>
                  <div className="media">
                    <div className="avatar me-3 ms-1">
                      {topCand.image ? (
                        <img
                          src={topCand.image}
                          alt=""
                          className="img-50 rounded-circle"
                        />
                      ) : (
                        <FiUser className="img-50 rounded-circle" style={{ fontSize: "50px", color: "#ccc" }} />
                      )}
                    </div>
                    <Media body className="d-flex justify-content-between">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <div>
                          <p
                            style={{ fontSize: "14px", fontWeight: 400 }}
                            className="mb-0"
                          >
                            {topCand.name}
                          </p>
                          <p
                            style={{
                              color: "#819ACB",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                            className="mt-0 mb-3"
                          >
                            {topCand.currentJob.title}
                          </p>
                        </div>
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: 400,
                          }}
                        >
                          Score{" "}
                          <span
                            style={{
                              color: "#299A16",
                              fontSize: "18px",
                              fontWeight: 400,
                            }}
                          >
                            {topCand.profileScore}%
                          </span>
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              color: "#595959",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {topCand?.experienceInYear} Years
                          </p>
                        </div>
                        <div className="display-flex-style gap-3">
                          <a href={topCand.linkedIn} target="_blank" rel="noopener noreferrer">
                            <FiLinkedin style={{ color: "#337cc7", fontSize: "large" }} />
                          </a>
                          <FiMessageSquare style={{ color: "#595959", fontSize: "large" }} />
                        </div>
                      </div>
                    </Media>
                  </div>
                </CardBody>

              </Card>
            </>
          );
        })}
      </div>
      <style>
        {`
          .info-box {
            position: absolute;
            top: 25px;
            right: 0;
            left:0;
            background: white;
            padding: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 1;
            display: flex;
            gap: 10px;
          }
          .info-box img {
            width: 150px;
            height: 150px;
            object-fit: contain;
          }
        `}
      </style>
      {topCandidateDetail &&
        <div className="shadow-container">
          <p style={{
            color: '#1264FD', fontFamily: 600, fontSize: '16px', textDecoration: 'underline', position: "relative",
            top: "38px",
            right: "15px"
          }}> <span style={{ fontWeight: 600, fontSize: '16px', position: 'relative', bottom: '5px' }}>View More</span></p>
        </div>
      }
    </Fragment>
  );
};

export default TopCandidate;
