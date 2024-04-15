import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { Image, H5, LI, UL, H6 } from "../../../../AbstractElements";
import linkedinIcon from "../../../../assets/used-files/icons/linkedin.svg";
import {
  BrooklynSimmons,
  BrooklynSimmonsEmail,
  classname,
} from "../../../../Constant";
import { SocialProfileStatus } from "../../../../Data/Social";
import CountUp from "react-countup";
import {
  BOD,
  ContactUs,
  ContactUsNumber,
  DDMMYY,
  Designer,
  Email,
  Follower,
  Following,
  LocationDetails,
  MarekjecnoMailId,
  MarkJecno,
  Location,
} from "../../../../Constant";

import profileImage from "../../../../assets/images/dashboard-5/profile.png";
import SvgIcon from "../../../Common/Component/SvgIcon";
import DefaultUserImage from "../../../../assets/used-files/profile/default2.png";
import profileScore from "../../../../assets/used-files/icons/profileScore.svg";
import lineBreaker from "../../../../assets/used-files/icons/lineBreaker.svg";
import phoneIcon from "../../../../assets/used-files/icons/phone.svg";
import envelopIcon from "../../../../assets/used-files/icons/envelope.svg";
import websiteIcon from "../../../../assets/used-files/icons/website.svg";

const ProfileCard = () => {
  const [url, setUrl] = useState("");
  const readUrl = (event) => {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setUrl(reader.result);
    };
  };

  return (
    <Fragment>
      <Card className="hovercard ">
        <div className="user-image">
          <div className="avatar">
            <Image
              attrImage={{
                className: "step1",
                alt: "",
                src: `${url ? url : DefaultUserImage}`,
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
                  <a target="_blank">
                    <strong>Bianca Gottesman</strong>
                  </a>
                </div>
                <div className="desc mt-2">
                  Cheif Executive Officer at Super Smalls
                </div>
                <div className="desc mt-2">500+ Connections</div>
                <div className="desc mt-2">
                  <Image
                    attrImage={{
                      className: "me-2",
                      alt: "",
                      src: profileScore,
                    }}
                  />
                  <strong className="me-2"> Profile Score:</strong>75/100{" "}
                  <span className="ms-2 badge badge-success">Excellent </span>
                </div>
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
                  <p>+1 562-659-3658</p>
                </div>
              </div>
            </Col>
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
                  <p>yourtestmail@gmail.com</p>
                </div>
              </div>
            </Col>
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
                  <p className=" text-primary">figma.com</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Fragment>
  );
};

export default ProfileCard;
