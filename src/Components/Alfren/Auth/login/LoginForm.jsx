import React, { Fragment, useState } from "react";

import { Btn, H4, H6, Image, P } from "../../../../AbstractElements";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
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
import OrIcon from "../../../../assets/used-files/images/auth/Or.svg";
import GoogleIcon from "../../../../assets/used-files/icons/Google.svg";
import LinkedInIcon from "../../../../assets/used-files/icons/LinkedInSquare.svg";
import { useForm } from "react-hook-form";
import man from "../../../../assets/images/dashboard/profile.png";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = ({ logoClassMain }) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(localStorage.getItem("Name"));

  const onSubmit1 = (e) => {
    // e.preventDefault();
    setValue(man);
    setName("Emay Walter");
    if (email === "test@gmail.com" && password === "test123") {
      localStorage.setItem("login", JSON.stringify(true));
      history(`${process.env.PUBLIC_URL}/dashboard/`);
      toast.success("Successfully logged in!..");
    } else {
      toast.error("You enter wrong password or username!..");
    }
  };

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
            <Form
              className="theme-form login-form"
              onSubmit={handleSubmit(onSubmit1)}
            >
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
                Welcome Back 👋{" "}
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
                    <Mail strokeWidth={0.5} size={16} />
                  </InputGroupText>
                  <Input type="email" placeholder="example@email.com" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label className="col-form-label m-0">
                  Password
                  <span className="text-danger ms-1">*</span>
                </Label>

                <InputGroup>
                  <InputGroupText>
                    <Key strokeWidth={0.5} size={16} />
                  </InputGroupText>
                  <Input
                    type={togglePassword ? "text" : "password"}
                    placeholder="aaaaaaaa"
                  />
                  <InputGroupText>
                    <Eye
                      strokeWidth={0.5}
                      size={16}
                      onClick={() => setTogglePassword(!togglePassword)}
                    />
                  </InputGroupText>
                </InputGroup>
              </FormGroup>

              <FormGroup className="position-relative">
                <Link
                  style={{
                    styleName: "Tiny Body",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "19.2px",
                    color: "#1264FD",
                  }}
                  to={`${process.env.PUBLIC_URL}/auth/forgot-password`}
                >
                  Forgot password?
                </Link>
              </FormGroup>

              <FormGroup>
                <Btn
                  attrBtn={{
                    className: "d-block w-100 mt-2",
                    color: "primary",
                    type: "submit",
                  }}
                >
                  Sign In
                </Btn>
              </FormGroup>

              <div className="login-social-title text-center">
                <Image attrImage={{ src: OrIcon }} />
              </div>

              <div className="social my-4 text-center ">
                <div className="btn-showcase">
                  <a
                    className="btn"
                    href="https://twitter.com/login?lang=en"
                    rel="noreferrer"
                    target="_blank"
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      lineHeight: "19.2px",
                      textAlign: "center",
                      width: "134.03px", // Fixed width
                      height: "43.56px", // Hug height
                      padding: "10.05px 7.54px", // Padding top and bottom: 10.05px, Padding left and right: 7.54px
                      gap: "6.7px", // Gap between elements (if used in a flexbox layout)
                      borderRadius: "3.35px", // Border radius values for each corner
                      border: "0.84px solid #F1F1F1", // Border style (solid), color (transparent), and width (0.84px)
                      boxShadow: "0px 5.03px 25.13px 0px #0000000D",
                    }}
                  >
                    <Image
                      attrImage={{
                        src: GoogleIcon,
                        style: { paddingRight: "4px" },
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "19.2px",
                        textAlign: "left",
                        color: "#595959",
                      }}
                    >
                      Google
                    </span>
                  </a>
                  <a
                    className="btn"
                    href="https://www.linkedin.com/login"
                    rel="noreferrer"
                    target="_blank"
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      lineHeight: "19.2px",
                      textAlign: "center",
                      width: "134.03px", // Fixed width
                      height: "43.56px", // Hug height
                      padding: "10.05px 7.54px", // Padding top and bottom: 10.05px, Padding left and right: 7.54px
                      gap: "6.7px", // Gap between elements (if used in a flexbox layout)
                      borderRadius: "3.35px", // Border radius values for each corner
                      border: "0.84px solid #F1F1F1", // Border style (solid), color (transparent), and width (0.84px)
                      boxShadow: "0px 5.03px 25.13px 0px #0000000D",
                    }}
                  >
                    <Image
                      attrImage={{
                        src: LinkedInIcon,
                        style: { paddingRight: "4px" },
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "19.2px",
                        textAlign: "left",
                        color: "#595959",
                      }}
                    >
                      LinkedIn
                    </span>
                  </a>
                </div>
              </div>

              <P attrPara={{ className: "text-center mb-0 " }}>
                Don't you have an account?{" "}
                <Link
                  className="ms-2"
                  to={`${process.env.PUBLIC_URL}/auth/register`}
                  style={{
                    color: "#1264FD",
                    fontSize: "12px",
                    fontWeight: "600",
                    lineHeight: "19.2px",
                    textAlign: "center",
                  }}
                >
                  Sign Up
                </Link>
              </P>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
