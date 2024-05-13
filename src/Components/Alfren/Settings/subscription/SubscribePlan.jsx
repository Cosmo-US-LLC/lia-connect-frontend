import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Btn, H3, Image, LI, P, UL } from "../../../../AbstractElements";
import { Check, Info, X } from "react-feather";
import editIcon from "../../../../assets/used-files/icons/edit.svg";
import masterCardIcon from "../../../../assets/used-files/icons/masterCard.svg";
const SubscribePlan = ({ activePlan, monthlyButtonActive }) => {
  return (
    <Fragment>
      <Container fluid={true}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: "26px", fontWeight: 600 }} className="pt-5">
            Plan & Billing
          </p>
          <p style={{ fontSize: "12px", fontWeight: 400 }} className="pb-3">
            Application only to sales Navigator / Recruiter users wth multiple
            LinkedIn contracts
          </p>
        </div>{" "}
        <div className="planBillingDiv">
          <Row
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Col xl="4">
              <div style={{ textAlign: "left" }}>
                <div className="divContent">
                  <span className="top">
                    Billed
                    {monthlyButtonActive ? " Monthly" : " Yearly"}
                  </span>
                  <span className="bottom">{activePlan.name}</span>
                </div>
              </div>
            </Col>
            <Col xl="4">
              <div style={{ textAlign: "left" }}>
                {" "}
                <div className="divContent">
                  <span className="top">Payment</span>
                  <span className="bottom">
                    ${activePlan.price}{" "}
                    <span className="bottomDuration">per user/month</span>
                  </span>
                </div>
              </div>
            </Col>
            <Col xl="4">
              <div
                style={{
                  textAlign: "right",
                  paddingRight: "20px",
                  marginTop: "3%",
                }}
              >
                <span
                  style={{
                    color: "#819ACB",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  Cancel Subscription
                </span>
                <span
                  className="ms-2"
                  style={{
                    color: "#1264FD",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  Upgrade
                </span>
              </div>
            </Col>
            <div className="gradientStyle mt-2"></div>
          </Row>
          <Row
            style={{
              paddingBottom: "15px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Col xl="4">
              <div style={{ textAlign: "left" }}>
                <div className="divContent">
                  <span className="top">Status</span>
                  <span className="bottom2">{"Active"}</span>
                </div>
              </div>
            </Col>
            <Col xl="4">
              <div style={{ textAlign: "left" }}>
                {" "}
                <div className="divContent">
                  <span className="top">Next Charge</span>
                  <span className="bottom2">{"Apr 15, 2024"}</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col xl="7">
            <div className="planBillingDiv">
              <Row
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Col xl="4">
                  <div style={{ textAlign: "left" }}>
                    <div className="divContent">
                      <span className="bottom">
                        {"Email Finder"}{" "}
                        <Info color="#8FA8D7" size={16} strokeWidth={1} />
                      </span>
                    </div>
                  </div>
                </Col>
                <Col xl="4">
                  <div style={{ textAlign: "left" }}>
                    {" "}
                    <div className="divContent">
                      <span className="bottom">{"Free Plan"}</span>
                    </div>
                  </div>
                </Col>
                <Col xl="4">
                  <div style={{ textAlign: "right" }}>
                    <div className="divContent">
                      <span className="top">Free Trial</span>
                      <span
                        className="ms-2"
                        style={{
                          color: "#1264FD",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        Upgrade
                      </span>{" "}
                    </div>
                  </div>
                </Col>
                <div className="gradientStyle mt-4"></div>
              </Row>
              <Row
                style={{
                  paddingTop: "25px",
                  paddingBottom: "25px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Col xl="4">
                  <div style={{ textAlign: "left" }}>
                    <div className="divContent">
                      <span className="top">Status</span>
                      <span className="bottom2">{"Active"}</span>
                    </div>
                  </div>
                </Col>
                <Col xl="4">
                  <div style={{ textAlign: "left" }}>
                    {" "}
                    <div className="divContent">
                      <span className="top">Trial End</span>
                      <span className="bottom2">{"Apr 15, 2024"}</span>
                    </div>
                  </div>
                </Col>
                <Col xl="4">
                  <div style={{ textAlign: "right" }}>
                    {" "}
                    <div className="divContent">
                      <span className="top">Credits</span>
                      <span className="bottom2">{"100/month"}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xl="5">
            <div className="planBillingDiv">
              <Row
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Col xl="10">
                  <div style={{ textAlign: "left" }}>
                    <div className="divContent">
                      <span className="bottom">Payment Method</span>
                      <span className="top">
                        {"Change your payment method from here"}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col xl="2">
                  <div style={{ textAlign: "left" }}>
                    <div className="divContent">
                      <div className="mt-3">
                        <Image
                          attrImage={{
                            src: editIcon,
                            width: "15px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <div className="gradientStyle mt-2"></div>
              </Row>
              <Row
                style={{
                  paddingBottom: "15px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Col xl="9">
                  <div className="d-flex">
                    <span>
                      <Image
                        attrImage={{
                          src: masterCardIcon,
                        }}
                      />
                    </span>
                    <span className="ms-3">
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#2C2C2C",
                        }}
                      >
                        Master Card
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#2C2C2C",
                        }}
                      >
                        **** **** **** 4002
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          color: "#696969",
                        }}
                      >
                        Expiry on 20/2024
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "#696969",
                          marginTop: "10px",
                        }}
                      >
                        billing@acme.corp
                      </div>
                    </span>
                  </div>
                </Col>
                <Col xl="3">
                  <div className="mt-3">
                    <button className="btn btn-outline-light btn-sm">
                      Change
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SubscribePlan;
