import React, { Fragment } from "react";
import { Card, Row, Col } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import linkedinIcon from "../../../../assets/used-files/icons/linkedin.svg";

import DefaultUserImage from "../../../../assets/used-files/profile/default2.png";
import profileScore from "../../../../assets/used-files/icons/profileScore.svg";
import lineBreaker from "../../../../assets/used-files/icons/lineBreaker.svg";
import phoneIcon from "../../../../assets/used-files/icons/phone.svg";
import envelopIcon from "../../../../assets/used-files/icons/envelope.svg";
import websiteIcon from "../../../../assets/used-files/icons/website.svg";

const ProfileCard = ({ candidateDetails }) => {
  return (
    <Fragment>
      <Card className="hovercard ">
        <div className="user-image">
          <div className="avatar">
            <Image
              attrImage={{
                className: "step1",
                alt: "",
                src: candidateDetails.candidate.image
                  ? candidateDetails.candidate.image
                  : `${DefaultUserImage}`,
              }}
            />
          </div>
          <div
            className="icon-wrapper step2"
            data-intro="Change Profile image here"
          >
            <Image
              attrImage={{
                className: "step1",
                alt: "",
                src: linkedinIcon,
              }}
            />
          </div>
        </div>
        <div className="info  mt-5">
          <Row
            className="step3 text-left"
            data-intro="This is the your details"
          >
            <Col sm="12" lg="12" className="order-sm-0 order-xl-1">
              <div className="user-designation">
                <div className="title">
                  <a href="#" target="_blank">
                    <strong>{candidateDetails.candidate.name}</strong>
                  </a>
                </div>
                <div className="desc mt-2">
                  {candidateDetails.candidate.currentJob.title}
                </div>
                <div className="desc mt-2">
                  {candidateDetails.candidate.description}
                </div>
                
                {candidateDetails.candidate.connections && (
                  <div className="desc mt-2">
                    {candidateDetails.candidate.connections} Connections
                  </div>
                )}

                {candidateDetails.candidate.profileScore && (
                  <div className="desc mt-2">
                    <Image
                      attrImage={{
                        className: "me-2",
                        alt: "",
                        src: profileScore,
                      }}
                    />
                    <strong className="me-2"> Profile Score:</strong>
                    {candidateDetails.candidate.profileScore}/100{" "}
                    <span className="ms-2 badge badge-success">Excellent </span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <div className="text-center mt-3 mb-3">
            {" "}
            <Image
              attrImage={{
                alt: "",
                src: lineBreaker,
              }}
            />
          </div>

          <Row>
            {candidateDetails.candidate.contact.phone && (
              <Col xl="12" xs="6" className="text-left">
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <Image
                    attrImage={{
                      className: "me-2 mt-1",
                      alt: "",
                      src: phoneIcon,
                    }}
                  />
                  <div>
                    <strong>Contact Number</strong>
                    <br></br>
                    <p>{candidateDetails.candidate.contact.phone}</p>
                  </div>
                </div>
              </Col>
            )}

            {candidateDetails.candidate.contact.email && (
              <Col xl="12" xs="6" className="text-left">
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <Image
                    attrImage={{
                      className: "me-2 mt-1",
                      alt: "",
                      src: envelopIcon,
                    }}
                  />
                  <div>
                    <strong>Email</strong>
                    <br></br>
                    <p>{candidateDetails.candidate.contact.email}</p>
                  </div>
                </div>
              </Col>
            )}
            {candidateDetails.candidate.contact.website && (
              <Col xl="12" xs="6" className="text-left">
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <Image
                    attrImage={{
                      className: "me-2 mt-1",
                      alt: "",
                      src: websiteIcon,
                    }}
                  />
                  <div>
                    <strong>Website</strong>
                    <br></br>
                    <p className=" text-primary">
                      {candidateDetails.candidate.contact.website}
                    </p>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </Card>
    </Fragment>
  );
};

export default ProfileCard;
