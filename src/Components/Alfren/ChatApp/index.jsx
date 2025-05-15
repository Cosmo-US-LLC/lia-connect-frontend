import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import ChatImage from "../../../assets/images/chats.png";

const ChatApp = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card style={{ boxShadow: "none" }}>
              <CardHeader className="pb-3">Messages</CardHeader>

              <div style={{ textAlign: "center", padding: "20px" }}>
                <img
                  src={ChatImage}
                  alt="Coming Soon"
                  style={{ width: "380px", height: "300px" }}
                />
                <br />
                <h2>Coming Soon</h2>
                <br /><br />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ChatApp;
