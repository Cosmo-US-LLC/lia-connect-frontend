import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Image, P } from "../../../../AbstractElements";
import ResetPwdForm from "./ResetPwdForm";
import CarousalSection from "../user-login/components/CarousalSection";

const Login = () => {
  return (
    <Fragment>
      <section className="login-wrapper">
        <Container fluid={true} className="login-main-wrapper">
          <Row>
            <Col
              xl="6 p-0"
              style={{
                backgroundColor: "#F2F4FF",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            >
              <CarousalSection textPosition="right" showLogo={true} />
            </Col>
            <Col
              xl="6 p-0"
              style={{ backgroundColor: "white", borderRadius: "20px" }}
            >
              <ResetPwdForm logoClassMain="text-center" />
              <P
                attrPara={{
                  className: "text-center mb-3",
                  style: {
                    color: "#8FA8D7",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "19.2px",
                  },
                }}
              >
                © 2024 Alfren HR. ALL RIGHTS RESERVED
              </P>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Login;
