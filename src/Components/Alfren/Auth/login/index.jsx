import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Fragment>
      <section>
        <Container fluid={true}>
          <Row>
            <Col
              xl="5"
              className="b-center bg-size"
              style={{
                backgroundImage: `url(${require("../../../../assets/used-files/images/auth/login.png")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "block",
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
            <Col xl="7 p-0">
              <LoginForm logoClassMain="text-start" />
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Login;
