import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Image, P } from "../../../../AbstractElements";
import ResetPwdForm from "./ResetPwdForm";

const Login = () => {
  return (
    <Fragment>
      <section className="login-wrapper">
        <Container fluid={true} className="login-main-wrapper">
          <Row>
            <Col
              xl="7"
              className="b-center bg-size"
              style={{
                backgroundImage: `url(${require("../../../../assets/used-files/images/auth/login.png")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "block",
                borderRadius: "20px",
              }}
            >
              <Image
                attrImage={{
                  className: "bg-img-cover bg-center d-none",
                  src: `${require("../../../../assets/used-files/images/auth/login.png")}`,
                  alt: "looginpage",
                }}
              />
            </Col>
            <Col
              xl="5 p-0"
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
                © 2024 Lia Connect. ALL RIGHTS RESERVED
              </P>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Login;
