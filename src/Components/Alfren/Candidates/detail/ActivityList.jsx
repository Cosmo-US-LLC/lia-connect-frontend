import React, { Fragment } from "react";
import { Card, Col, Row } from "reactstrap";

function ActivityList({ candidateDetails }) {
  return (
    <Fragment>
      <Card className="hovercard">
        <div className="info">
          <Row className="text-left">
            <Col sm="12" lg="12" className="order-sm-0 order-xl-1 mb-3">
              <h5 className="mb-2">
                <strong>Activity</strong>
              </h5>

              <div className="mt-4">
                {candidateDetails?.candidate?.activities?.length > 0
                  ? candidateDetails?.candidate?.activities?.map(
                      (activity, index) => (
                        <div
                          key={index}
                          style={{
                            border: "1px solid #f0f0f0",
                            borderRadius: "10px",
                            padding: "10px",
                            position: "relative",
                            minHeight: "35px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "16px",
                              //   height: "15px",
                              position: "absolute",
                              top: "-15px",
                              background: "white",
                              padding: "0 5px",
                              width: "fit-content",
                              //   lineHeight: "16px",
                              fontWeight: "600",
                              letterSpacing: "2px",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            {
                              candidateDetails?.candidate?.jobs?.find(
                                (job) => job?.id == activity?.jobId
                              )?.name
                            }
                            <span className="pt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="#000000"
                                viewBox="0 0 256 256"
                              >
                                <path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"></path>
                              </svg>
                            </span>
                          </div>

                          <ul className="mt-1">
                            {/* 
                                candidateReplied: true
                                candidateRepliedAt: "2025-05-18T08:59:34.215Z"

                                checkedConnectionRequestStatus: true
                                lastCheckedConnectionRequestStatusAt: "2025-05-16T08:59:34.215Z"
                                
                                connectionRequestAccepted: true
                                connectionRequestAcceptedAt: "2025-05-17T08:59:34.215Z"
                                
                                connectionRequestSent: true
                                connectionRequestSentAt: "2025-05-15T08:59:34.215Z"
                                
                                checkedReplyStatus: true
                                lastCheckedForReplyStatusAt: "2025-05-20T08:59:34.215Z"

                                messageSent: true
                                messageSentAt: "2025-05-18T08:59:34.215Z"

                                profileFetched: true
                                profileFetchedAt "2025-05-14T08:59:34.215Z"
                            */}
                            {/* {activity?.candidateReplied} */}
                            {activity?.candidateReplied && (
                                <li>Check candidateReplied</li>
                            )}
                            {activity?.checkedConnectionRequestStatus && (
                                <li>Check checkedConnectionRequestStatus</li>
                            )}
                            {activity?.connectionRequestAccepted && (
                                <li>Check connectionRequestAccepted</li>
                            )}
                            {activity?.connectionRequestSent && (
                                <li>Check connectionRequestSent</li>
                            )}
                            {activity?.checkedReplyStatus && (
                                <li>Check checkedReplyStatus</li>
                            )}
                            {activity?.messageSent && (
                                <li>Check messageSent</li>
                            )}
                            {activity?.profileFetched && (
                                <li>Check profileFetched</li>
                            )}
                          </ul>
                        </div>
                      )
                    )
                  : "No Activities found!"}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Fragment>
  );
}

export default ActivityList;
