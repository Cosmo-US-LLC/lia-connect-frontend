import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Image, P } from "../../../../AbstractElements";
import LoginForm from "./LoginForm";
import LogoIcon from "../../../../assets/used-files/images/auth/logoIcon.svg";

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
                backgroundImage: `url('/img/alfren-hr.gif')`,
                // backgroundImage: `url(${require("../../../../assets/used-files/images/auth/login.png")})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "#F2F4FF",
                display: "block",
                borderRadius: "20px",
              }}
            >
              <Image
                attrImage={{
                  className: "bg-img-cover bg-center m-3",
                  src: LogoIcon,
                  alt: "looginpage",
                }}
              />
              <Image
                attrImage={{
                  className: "bg-img-cover bg-center d-none",
                  src: `${require("../../../../assets/used-files/images/auth/login.png")}`,
                  alt: "looginpage",
                }}
              />
              {/* <img src="/img/alfren-hr.gif" alt="" style={{ border: "1px solid black" }} /> */}
            </Col>
            <Col
              xl="5 p-0"
              style={{ backgroundColor: "white", borderRadius: "20px" }}
            >
              <LoginForm logoClassMain="text-center" />
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
