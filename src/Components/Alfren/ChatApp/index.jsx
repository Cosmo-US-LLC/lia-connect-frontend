import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";

const ChatApp = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card style={{ boxShadow: "none" }}>
              <CardHeader className="pb-3">Settings</CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ChatApp;
