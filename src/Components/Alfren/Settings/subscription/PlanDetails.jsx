import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Btn, H3, LI, P, UL } from "../../../../AbstractElements";
import { Check, X } from "react-feather";

const PlanDetails = ({
  monthlyButtonActive,
  subscriptionDetails,
  setMonthlyButtonActive,
  setPlanAndBilling,
  setActivatePlan,
}) => {
  const handleActivatePlan = (index) => {
    setActivatePlan(index);
    setPlanAndBilling(true);
  };
  return (
    <Fragment>
      <Container fluid={true}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: "26px", fontWeight: 600 }} className="pt-5">
            Subscription Plan
          </p>
          <p style={{ fontSize: "12px", fontWeight: 400 }} className="pb-3">
            Application only to sales Navigator / Recruiter users wth multiple
            LinkedIn contracts{" "}
          </p>
          <span
            style={{
              border: "1px solid rgb(232, 233, 238)",
              fontSize: "14px",
              paddingTop: "8px",
              paddingBottom: "8px",
              // width: "55%",
              borderRadius: "30px",
              backgroundColor: "white",
            }}
          >
            {monthlyButtonActive ? (
              <>
                <span
                  style={{
                    color: "white",
                    backgroundColor: "#1264FD",
                    boxShadow: " 0px 0px 32px 0px #3D64FF94",
                    border: "1px solid #1264FD",
                    fontSize: "14px",
                    borderRadius: "30px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    fontWeight: "400",
                  }}
                >
                  Monthly
                </span>
                <span
                  style={{
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "400",
                  }}
                  onClick={() => setMonthlyButtonActive(false)}
                >
                  Yearly
                </span>
              </>
            ) : (
              <>
                <span
                  style={{
                    color: "black",
                    fontSize: "14px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    fontWeight: "400",
                  }}
                  onClick={() => setMonthlyButtonActive(true)}
                >
                  Monthly
                </span>
                <span
                  style={{
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    fontSize: "14px",
                    fontWeight: "400",
                    backgroundColor: "#1264FD",
                    border: "1px solid #1264FD",
                    borderRadius: "30px",
                    color: "white",
                    boxShadow: " 0px 0px 32px 0px #3D64FF94",
                  }}
                >
                  Yearly{" "}
                </span>
              </>
            )}
          </span>
          <div className="pt-5 pb-1">
            <span
              style={{ color: "#299A16", fontSize: "10px", fontWeight: 600 }}
            >
              Save upto 30 %
            </span>
          </div>
        </div>{" "}
        <div className="p-3">
          <Row className="pricing-block">
            {subscriptionDetails.map((item, index) => {
              return (
                <Col lg="4" md="4">
                  <div className="pricingtable">
                    <div className="price-value">
                      <span className="currency">{"$"}</span>
                      <span className="amount">{item.price}</span>
                      <span className="duration">{"per user/month"}</span>
                    </div>
                    <div className="pricingtable-headerTitle">
                      <H3 attrH3={{ className: "title" }}>{item.name}</H3>
                      <P attrH3={{ className: "billed" }}>
                        Billed
                        {monthlyButtonActive ? " Monthly" : " Yearly"}
                      </P>
                    </div>

                    <UL attrUL={{ className: "pricing-content flex-row" }}>
                      {item.items.map((element, index2) => {
                        return (
                          <li className="">
                            {element.name}
                            <span
                              className="me-1"
                              style={{ paddingTop: "3px" }}
                            >
                              {element.available ? (
                                <>
                                  <Check
                                    strokeWidth={2}
                                    color="#299A16"
                                    size={15}
                                  />
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <X
                                    strokeWidth={2}
                                    color="#8FA8D7"
                                    size={15}
                                  />{" "}
                                </>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </UL>
                    <div
                      className="pricingtableSignup"
                      onClick={() => handleActivatePlan(index)}
                    >
                      <span className="btnSpan">Upgrade</span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default PlanDetails;
