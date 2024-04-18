import React, { Fragment, useState } from "react";
import { Btn, H4, P } from "../../../../AbstractElements";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  Check,
  CheckCircle,
  Circle,
  Eye,
  Facebook,
  Filter,
  Key,
  Linkedin,
  Mail,
  Twitter,
} from "react-feather";

import logoWhite from "../../../../assets/images/logo/logo.png";
import logoDark from "../../../../assets/images/logo/logo_dark.png";

const ResetPwdForm = ({ logoClassMain }) => {
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
                  New Password<span className="text-danger ms-1">*</span>
                </Label>

                <InputGroup>
                  <InputGroupText>
                    <Key strokeWidth={1} size={16} />
                  </InputGroupText>
                  <Input
                    type={togglePassword ? "text" : "password"}
                    required
                    placeholder="Password"
                  />
                  <InputGroupText>
                    <Eye
                      strokeWidth={1}
                      size={16}
                      onClick={() => setTogglePassword(!togglePassword)}
                    />
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label className="col-form-label m-0">
                  Confirm New Password
                  <span className="text-danger ms-1">*</span>
                </Label>

                <InputGroup>
                  <InputGroupText>
                    <Key strokeWidth={1} size={16} />
                  </InputGroupText>
                  <Input
                    type={togglePassword ? "text" : "password"}
                    required
                    placeholder="Confirm Password"
                  />
                  <InputGroupText>
                    <Eye
                      strokeWidth={1}
                      size={16}
                      onClick={() => setTogglePassword(!togglePassword)}
                    />
                  </InputGroupText>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <div style={{ color: "#299A16" }}>
                  <Check strokeWidth={1} size={7} />
                  <span style={{ fontSize: "10px", marginLeft: "4px" }}>
                    Atleast 1 letter should be uppercase.
                  </span>
                </div>
                <div style={{ color: "#299A16" }}>
                  <Check strokeWidth={1} size={7} />
                  <span style={{ fontSize: "10px", marginLeft: "4px" }}>
                    Atleast 1 special character include.
                  </span>
                </div>
                <div style={{ color: "#AA1313" }}>
                  <Check strokeWidth={1} size={7} />
                  <span style={{ fontSize: "10px", marginLeft: "4px" }}>
                    Atleast 1 number include.
                  </span>
                </div>
                <div style={{ color: "#595959" }}>
                  <Circle strokeWidth={1} size={7} />
                  <span style={{ fontSize: "10px", marginLeft: "4px" }}>
                    Password should be 12 letter long.
                  </span>
                </div>
              </FormGroup>

              <FormGroup>
                <Btn
                  attrBtn={{
                    className: "d-block w-100 mt-2",
                    color: "primary",
                    type: "submit",
                  }}
                >
                  Confirm
                </Btn>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPwdForm;
