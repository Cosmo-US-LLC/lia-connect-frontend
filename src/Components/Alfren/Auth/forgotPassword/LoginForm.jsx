import React, { Fragment, useState } from "react";
import { Btn, H4, P, H6, Image } from "../../../../AbstractElements";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Facebook, Filter, Linkedin, Mail, Twitter } from "react-feather";

import logoWhite from "../../../../assets/images/logo/logo.png";
import logoDark from "../../../../assets/images/logo/logo_dark.png";
import { MarginBottom } from "../../../../Constant";

const LoginForm = ({ logoClassMain }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <Fragment>
      <div className="login-card">
        <div>
          {/* <div>
            <Link
              className={`logo ${logoClassMain ? logoClassMain : ""}`}
              to={process.env.PUBLIC_URL}
            >
              <Image
                attrImage={{
                  className: "img-fluid for-light",
                  src: logoWhite,
                  alt: "looginpage",
                }}
              />
              <Image
                attrImage={{
                  className: "img-fluid for-dark",
                  src: logoDark,
                  alt: "looginpage",
                }}
              />
            </Link>
          </div> */}
          <div className="login-main">
            <Form className="theme-form login-form">
              <H4
                attrH4={{
                  style: {
                    color: "#1D1D1D",
                    fontSize: "30.16px",
                    fontWeight: 600,
                    lineHeight: "30.16px",
                    letterSpacing: "-0.01em",
                    textAlign: "center",
                    marginBottom: "20px",
                  },
                }}
              >
                Reset Password
              </H4>
              <P
                attrPara={{
                  style: {
                    color: "#595959",
                    fontSize: "13.4px",
                    fontWeight: 400,
                    lineHeight: "21.45px",
                    textAlign: "center",
                    marginBottom: "40px",
                  },
                }}
              >
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your projects.
              </P>
              <FormGroup>
                <Label className="col-form-label m-0">
                  Email<span className="text-danger ms-1">*</span>
                </Label>

                <InputGroup>
                  <InputGroupText>
                    <Mail strokeWidth={1} size={16} />
                  </InputGroupText>
                  <Input type="email" required value="Example@email.com" />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <Btn
                  attrBtn={{
                    className: "d-block w-100 mt-2",
                    color: "primary",
                    type: "submit",
                  }}
                >
                  Send Request
                </Btn>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
