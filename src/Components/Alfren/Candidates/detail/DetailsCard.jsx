import React, { Fragment } from "react";
import { Card, Row, Col } from "reactstrap";
import { Image } from "../../../../AbstractElements";

import lineBreaker from "../../../../assets/used-files/icons/lineBreaker.svg";

const DetailsCard = ({ candidateDetails }) => {
  const companyInfo = candidateDetails?.candidate?.currentJob?.company?.name;
  const [companyName, employmentType] = ( companyInfo || "N/A .N/A")?.split(" ·") || ["N/A", "N/A"];
  // const [companyName, employmentType] = ["N/A", "N/A"];
  return (
    <Fragment>
      <Card className="hovercard ">
        <div className="info">
          <Row className="text-left">
            <Col sm="12" lg="12" className="order-sm-0 order-xl-1">
              <div className="d-flex flex-row justify-content-between  ">
                <div className="d-flex flex-column">
                  <p
                    className="m-0"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    {employmentType}
                  </p>
                  <p
                    className="m-0"
                    style={{ fontSize: "16px", color: "#6c757d" }}
                  >
                    {companyName}
                  </p>
                </div>

                <div style={{ width: "80px", height: "80px" }}>
                  <img
                    src={candidateDetails?.candidate?.currentJob?.company?.logo}
                    alt="Company Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>

          {/* <Row className="text-left">
            <Col sm="12" lg="12" className="order-sm-0 order-xl-1">
              <div className="user-designation">
                <div className="title">
                  <p className="d-flex justify-content-between align-items-center">
                    {" "}
                    <span>
                      <strong>Company: </strong>{" "}
                      <span>
                        {candidateDetails.candidate.currentJob.company.name}
                      </span>
                    </span>
                    <Image
                      attrImage={{
                        className: "companyLogo",
                        alt: "",
                        src: candidateDetails.candidate.currentJob.company.logo,
                      }}
                    />
                  </p>
                </div>
              </div>
            </Col>
          </Row> */}

          <div className="text-center mt-4 mb-3"></div>

          <Row className="">
            <Col col="12" className="text-left">
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div>
                  <strong>City</strong>
                  <br></br>
                  <p>{candidateDetails?.candidate?.contact?.city}</p>
                </div>
              </div>
            </Col>
            <Col col="12" className="text-left">
              <div
                className="mx-4"
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <div>
                  <strong>Country</strong>
                  <br></br>
                  <p>{candidateDetails?.candidate?.contact?.country}</p>
                </div>
              </div>
            </Col>
          </Row>
          {/* <div className="text-center mt-1 mb-3">
            {" "}
            <Image
              attrImage={{
                alt: "",
                src: lineBreaker,
              }}
            />
          </div> */}
          {/* <Row>
            <Col xl="12" xs="6" className="text-left">
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div>
                  <strong>
                    Skills <span style={{ color: "red" }}>*</span>
                  </strong>
                  <br></br>
                  {candidateDetails?.candidate?.skills?.length > 0 &&
                    candidateDetails?.candidate?.skills?.map((skill, index) => (
                      <span key={index} className="badge badge-light m-1">
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </Col>
            <Col xl="12" xs="6" className="text-left mt-3">
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div>
                  <strong>Jobs</strong>
                  {candidateDetails?.candidate?.jobs?.map((job, index) => (
                    <div>
                      <p className=" text-primary">
                        {job.name}
                        <span
                          className="ms-2 badge badge-success"
                          style={{
                            borderLeft: "2px solid #299A16 ",
                            borderRadius: " 0px",
                          }}
                        >
                          {job.skillMatchScore
                            ? job.skillMatchScore + "Skills Matched"
                            : "Skills matching in process"}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row> */}
        </div>
      </Card>
    </Fragment>
  );
};

export default DetailsCard;
