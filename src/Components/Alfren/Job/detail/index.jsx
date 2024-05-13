import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import PotentialCandidates from "./PotentialCandidates";
import ResponseRate from "./ResponseRate";
import BlackList from "./BlackList";
import Priority from "./Priority";
import TopCandidate from "./TopCandidate";
import GenderGraph from "./GenderGraph";
import CandidatesByCity from "./CandidatesByCity";
import CandidateFunnel from "./CandidateFunnel";
import RequiredSkills from "./RequiredSkills";
import AvgExp from "./AvgExp";
import { Link } from "react-feather";

const CandidatesList = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <div className="user-profile mt-4">
          <p style={{ fontSize: "22px", fontWeight: 400 }}>
            Senior User Interface Designer
            <span className="ms-3" style={{ color: "#1264FD" }}>
              <Link size={20} strokeWidth={2} />
            </span>
          </p>

          <Row>
            <Col xl="12" className="col-ed-5 box-col-5">
              <Row>
                <Col xl="3" md="3">
                  <PotentialCandidates />
                </Col>
                <Col xl="3" md="3">
                  <ResponseRate />
                </Col>
                <Col xl="3" md="3">
                  <BlackList />
                </Col>
                <Col xl="3" md="3">
                  <Priority />
                </Col>
              </Row>
            </Col>
            <Col xl="12" className="col-ed-5 box-col-5">
              <Row>
                <Col xl="5" md="5">
                  <TopCandidate />
                </Col>
                <Col xl="7" md="7">
                  <Row>
                    <Col xl="4" md="4">
                      <GenderGraph />
                    </Col>
                    <Col xl="4" md="4">
                      <CandidatesByCity />
                    </Col>
                    <Col xl="4" md="4">
                      <AvgExp />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xl="12" className="col-ed-5 box-col-5">
              <Row>
                <Col xl="6" md="6">
                  <CandidateFunnel />
                </Col>
                <Col xl="6" md="6">
                  <RequiredSkills />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default CandidatesList;
