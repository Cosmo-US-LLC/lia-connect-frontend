import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Col, Media, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { CiCircleInfo } from "react-icons/ci";
import { fetchJobDetails } from "../../../../redux/Job/jobActions";
import { useDispatch } from "react-redux";
import { FiMessageSquare, FiUser } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { useNavigate } from "react-router";

const TopCandidate = ({ id }) => {
  const [topCandidateDetail, setJobDetails] = useState(null);
  const [hideScroll, setHideScroll] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [topCandidateId, setGetTopCandidateId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleModal = () => setModalOpen(!modalOpen);

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
    setGetTopCandidateId(id);
  };

  return (
    <Fragment>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 400,
          position: "relative",
          width: "100%",
          color: "#595959",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Top Candidates
        <span
          style={{
            position: "absolute",
            bottom: "11px",
            left: "0",
            width: "12%",
            borderBottom: "1px solid #1264FD",
          }}
        ></span>
        <p style={{ color: "#819ACB", paddingTop: "4px", cursor: "pointer" }}>
          Score
          <CiCircleInfo
            style={{
              color: "black",
              fontSize: "large",
              position: "relative",
              top: "5px",
              cursor: "pointer",
              left: "1px",
            }}
            onClick={toggleModal}
          />
        </p>
      </p>

 
      <Modal 
        isOpen={modalOpen} 
        toggle={toggleModal}
        style={{ 
          maxWidth: "1000px", 
          width: "80%",
          margin: "auto"
        }}
        centered
      >
        <ModalHeader 
          style={{ 
            position: "relative",
            padding: "1rem",
            borderBottom: "1px solid #dee2e6"
          }}
        >
          How Scores Are Calculated
          <button
            type="button"
            onClick={toggleModal}
            style={{
              position: "absolute",
              right: "20px",
              top: "15px",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#6c757d",
              padding: "0",
              margin: "0"
            }}
          >
            &times;
          </button>
        </ModalHeader>
        <ModalBody style={{ padding: "2rem" }}>  
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
            width: "100%"  
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <img 
                src="../../score-tip1.png" 
                alt="Skill Matching" 
                style={{ width: "100%", maxWidth: "350px", height: "auto" }}  
              />
              <span style={{ fontWeight: "bold", fontSize: "32px" }}>+</span>
              <img 
                src="../../score-tip2.png" 
                alt="Experience Matching" 
                style={{ width: "100%", maxWidth: "150px", height: "auto" }}  
              />
              <span style={{ fontWeight: "bold", fontSize: "32px" }}>=</span>
              <img 
                src="../../score-tip3.png" 
                alt="Total Score" 
                style={{ width: "100%", maxWidth: "270px", height: "auto" }}  
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter style={{ padding: "1rem 2rem", borderTop: "1px solid #dee2e6" }}>
          <Button 
            color="primary" 
            onClick={toggleModal}
            style={{
              padding: "0.375rem 0.75rem",
              fontSize: "1rem",
              borderRadius: "0.25rem"
            }}
          >
            Got It
          </Button>
        </ModalFooter>
      </Modal>

      {/* Rest of your component remains the same */}
      <div
        className={`candidate-container ${hideScroll ? "hide-scrollbar" : ""}`}
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {topCandidateDetail?.map((topCand, index) => {
          return (
            <Card
              onClick={() => handleGetId(topCand.id)}
              key={index}
              style={{
                border: "1px solid #EBF1FC",
                boxShadow: "3px 3px 3px 0px #BA9FC914",
                marginBottom: "10px",
                cursor: "pointer",
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
                      <FiUser
                        className="img-50 rounded-circle"
                        style={{ fontSize: "50px", color: "#ccc" }}
                      />
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
                        <p
                          style={{
                            color: "#819ACB",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {topCand?.state || "Location not specified"}
                        </p>
                      </div>
                      <div className="display-flex-style gap-3">
                        <a
                          href={topCand.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiLinkedin
                            style={{ color: "#337cc7", fontSize: "large" }}
                          />
                        </a>
                        <FiMessageSquare
                          style={{ color: "#595959", fontSize: "large" }}
                        />
                      </div>
                    </div>
                  </Media>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
      {topCandidateDetail && (
        <div className="relative">
          <p
            style={{
              color: "#1264FD",
              fontFamily: 500,
              fontSize: "14px",
              textDecoration: "underline",
              position: "absolute",
              bottom: "-15px",
              right: "25px",
            }}
          >
            {" "}
            <span
              style={{
                fontWeight: 500,
                fontSize: "14px",
                position: "relative",
                bottom: "3px",
              }}
            >
              View More
            </span>
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default TopCandidate;