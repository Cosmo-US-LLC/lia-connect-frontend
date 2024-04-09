import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import ProfileCard from "./ProfileCard";
import ActivityCard from "./ActivityCard";
import Notes from "./Notes";
import DetailsCard from "./DetailsCard";
const CandidatesList = () => {
  return (
    <Fragment>
      <Breadcrumbs title="Candidates" />
      <Container fluid={true}>
        <div className="user-profile">
          <Row>
            <Col xxl="5" xl="5" className="col-ed-5 box-col-5">
              <Row>
                <Col xl="12" md="6">
                  <ProfileCard />
                </Col>
                <Col xl="12" md="6">
                  <DetailsCard />
                </Col>
              </Row>
            </Col>
            <Col xxl="7" xl="7" className="col-ed-7 box-col-7">
              <Row>
                <Col xl="12" md="6">
                  <ActivityCard />
                </Col>
                <Col xl="12" md="6">
                  <Notes />
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
