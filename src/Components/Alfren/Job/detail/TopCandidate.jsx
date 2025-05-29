import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { CiCircleInfo } from "react-icons/ci";
import { FiMessageSquare, FiUser, FiLinkedin } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { fetchJobDetails } from "../../../../redux/Job/jobActions";
import { BsLinkedin } from "react-icons/bs";
import { MdMessage, MdAccessTime } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import user1 from "../../../../assets/images/user/user.png";
import { PiHandshakeLight } from "react-icons/pi";
import {
  BiCheckCircle,
  BiUserCheck,
  BiMessageRoundedCheck,
} from "react-icons/bi";

const TopCandidate = ({ id }) => {
  const [topCandidateDetail, setJobDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleModal = () => setModalOpen(!modalOpen);

  const [isMessaged, setIsMessaged] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const url = `/jobs/${id}/top-candidates`;
      dispatch(fetchJobDetails(url, handleFetchResponse));
    }
  }, [dispatch, id]);

  const handleFetchResponse = (resp) => {
    setLoading(false);
    if (resp?.status === 200) {
      setJobDetails(resp.data);
    } else {
      toast.error(resp?.message || "Failed to fetch candidates");
    }
  };

  const handleCandidateClick = (id) => {
    navigate(`/candidates/detail/${id}`);
  };

  const handleAllCandidateClick = () => {
    navigate(`/candidates?jobId=${id}`);
  };

  const iconStyle = {
    fontSize: "18px",
    paddingBottom: "2px",
    color: "#1264FD",
  };

  const activityIconMap = {
    "Profile Evaludated": <FiUser style={iconStyle} />,
    "Request Sent": <PiHandshakeLight style={iconStyle} />,
    "Request Status Checked": <BiCheckCircle style={iconStyle} />,
    "Request Accepted": <BiUserCheck style={iconStyle} />,
    "Message Sent": <MdMessage style={iconStyle} />,
    "Reply Checked": <BiMessageRoundedCheck style={iconStyle} />,
    "Candidate Replied": <BiMessageRoundedCheck style={iconStyle} />,
    Updated: <BiCheckCircle style={iconStyle} />,
    Created: <BiCheckCircle style={iconStyle} />,
  };

  console.log({ topCandidateDetail });

  return (
    <Card
      style={{
        borderRadius: "10px",
        marginBottom: "120px",
      }}
    >
      <CardBody>
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
            marginBottom: "20px",
          }}
        >
          {`Shortlisted Candidates (${topCandidateDetail?.length})`}

          <span
            style={{
              position: "absolute",
              bottom: "3px",
              left: "0",
              width: "12%",
              borderBottom: "1px solid #1264FD",
            }}
          ></span>

          {topCandidateDetail && topCandidateDetail.length > 0 && (
            <div className="relative">
              <p
                style={{
                  color: "#1264FD",
                  fontFamily: 500,
                  fontSize: "14px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {" "}
                <span
                  onClick={handleAllCandidateClick}
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    position: "relative",
                  }}
                >
                  View Shortlisted Candidates
                </span>
              </p>
            </div>
          )}
        </p>

        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          style={{
            maxWidth: "1000px",
            width: "80%",
            margin: "auto",
          }}
          centered
        >
          <ModalHeader
            style={{
              position: "relative",
              padding: "1rem",
              borderBottom: "1px solid #dee2e6",
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
                margin: "0",
              }}
            >
              &times;
            </button>
          </ModalHeader>
          <ModalBody style={{ padding: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  width: "100%",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
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
          <ModalFooter
            style={{ padding: "1rem 2rem", borderTop: "1px solid #dee2e6" }}
          >
            <Button
              color="primary"
              onClick={toggleModal}
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "1rem",
                borderRadius: "0.25rem",
              }}
            >
              Got It
            </Button>
          </ModalFooter>
        </Modal>

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading &&
          (!topCandidateDetail || topCandidateDetail.length === 0) && (
            <div className="text-center py-4 text-muted">
              No top candidates found
            </div>
          )}

        {!loading && topCandidateDetail && (
          <div
            style={{
              maxHeight: "800px",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {topCandidateDetail.map((topCand, index) => (
              <Card
                // onClick={() => handleCandidateClick(topCand.id)}
                key={index}
                style={{
                  border: "1px solid #EBF1FC",
                  boxShadow: "3px 3px 3px 0px #BA9FC914",
                  marginBottom: "10px",
                  height: "auto",
                }}
              >
                <CardBody style={{ padding: "6px" }}>
                  <div className="media">
                    <div className="avatar me-3 ms-1" style={{ width: "50px" }}>
                      {topCand?.image ? (
                        <img
                          src={topCand?.image || user1}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = user1;
                          }}
                          alt=""
                          className="img-50 rounded-circle"
                        />
                      ) : (
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 100,
                          }}
                        >
                          <FiUser
                            className="img-50 rounded-circle"
                            style={{ fontSize: "50px", color: "#ccc" }}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className="media-body"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                      }}
                    >
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
                            style={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#1264FD",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                            className="mb-0"
                            onClick={() => handleCandidateClick(topCand.id)}
                          >
                            {topCand.name}
                            <BiLinkExternal
                              style={{ fontSize: "14px", fontWeight: 400 }}
                            />
                          </p>
                          <p
                            style={{
                              color: "#819ACB",
                              fontSize: "12px",
                              fontWeight: 400,

                              height: "44px",
                            }}
                            className="mt-0 mb-2"
                          >
                            {topCand.currentJob.title}
                          </p>
                          <p
                            style={{
                              color: "#819ACB",
                              fontSize: "12px",
                              fontWeight: 400,
                              height: "20px",
                            }}
                          >
                            {topCand?.state}
                          </p>
                        </div>
                        {topCand.lastActionPerformed ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <p
                              style={{
                                color: "#595959",
                                fontSize: "12px",
                                fontWeight: 400,
                                height: "22px",
                                margin: 0,
                              }}
                            >
                              {topCand.lastActionPerformed.activity}
                            </p>

                            <p
                              style={{
                                color: "#999999",
                                fontSize: "10px",
                                fontWeight: 400,
                                margin: 0,
                              }}
                              title={new Date(
                                topCand.lastActionPerformed.activityTime
                              ).toLocaleString()}
                            >
                              {new Date(
                                topCand.lastActionPerformed.activityTime
                              ).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                            {/* 
                            <PiHandshakeLight
                              style={{
                                fontSize: "large",
                                paddingLeft: "4px",
                                color: "#299A16",
                              }}
                            /> */}
                            {activityIconMap[
                              topCand.lastActionPerformed.activity
                            ] ?? <BiCheckCircle style={iconStyle} />}
                          </div>
                        ) : (
                          <p style={{ fontSize: "12px", color: "#999" }}>
                            No Recent Activity
                          </p>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          maxWidth: "120px",
                          overflow: "hidden",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "10px",
                              height: "20px",
                              fontWeight: 400,
                              display: "flex",
                              gap: "6px",
                              paddingBottom: "0px",
                              justifyContent: "end",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "16px",
                              }}
                            >
                              Score{" "}
                              <CiCircleInfo
                                style={{
                                  color: "#000",
                                  fontSize: "16px",
                                  position: "relative",
                                  cursor: "pointer",
                                  pointerEvents: "auto",
                                }}
                                onClick={toggleModal}
                              />
                            </p>
                            <p
                              style={{
                                color: "#299A16",
                                fontSize: "16px",
                                fontWeight: 600,
                                paddingTop: "2px",
                              }}
                            >
                              {topCand.profileScore}%
                            </p>
                          </div>

                          <p
                            style={{
                              color: "#595959",
                              fontSize: "12px",
                              fontWeight: 400,
                              textAlign: "right",
                            }}
                          >
                            {topCand?.experienceInYear}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <a
                            href={topCand.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <BsLinkedin
                              style={{
                                fontSize: "18px",
                              }}
                            />
                          </a>

                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <a
                              href={topCand.threadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MdMessage
                                style={{
                                  color: topCand.threadLink
                                    ? "#1264FD"
                                    : "#CCCCCC",
                                  fontSize: "22px",
                                  cursor: "pointer",
                                }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TopCandidate;
