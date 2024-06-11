import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Col, Media, Row } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, P, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
import { Codepen } from "react-feather";
import linkedin from "../../../../assets/used-files/images/jobDetail/linkedin.svg";
import message from "../../../../assets/used-files/images/jobDetail/message.svg";
import { fetchJobDetails } from "../../../../redux/Job/jobActions";
import { useDispatch } from "react-redux";
import { FiMessageSquare, FiUser } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";

const TopCandidate = ({ id }) => {
  const [topCandidateDetail, setJobDetails] = useState(null);
  console.log('topCandidateDetail', topCandidateDetail)
  const [hideScroll, setHideScroll] = useState(true); // State to control scrollbar visibility
  const dispatch = useDispatch();

  const getJobDetails = () => {
    const url = `/jobs/${id}/top-candidates`;
    dispatch(
      fetchJobDetails(url, (resp) => {
        if (resp?.status === 200) {
          const result = resp.data;
          setJobDetails(result);
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
      <div className={`candidate-container ${hideScroll ? "hide-scrollbar" : ""}`} style={{ maxHeight: "420px", overflowY: "auto" }}>
      <p
            style={{
              fontSize: "12px",
              fontWeight: 400,
              position: "relative",
              width: "100%",
              color: "#595959",
            }}
          >
            Candidates By City
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "30%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
          </p>
        {topCandidateDetail?.map((topCand, index) => {
          return (
            <Card
              key={index}
              style={{
                border: "1px solid #EBF1FC",
                boxShadow: "3px 3px 3px 0px #BA9FC914",
                marginBottom: "10px",
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
                          {"6 Years"}
                        </p>
                      </div>
                      <div className="display-flex-style gap-3">
                        <a href={topCand.linkedIn}><FiLinkedin style={{ color: "#337cc7", fontSize: "large" }} /></a>
                        <FiMessageSquare style={{ color: "#595959", fontSize: "large" }} />
                      </div>
                    </div>
                  </Media>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </Fragment>
  );
};

export default TopCandidate;
