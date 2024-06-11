import React, { Fragment, useState } from "react";

import { Btn, H4, Image, P } from "../../../../AbstractElements";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Key, Mail } from "react-feather";

import OrIcon from "../../../../assets/used-files/images/auth/Or.svg";
import GoogleIcon from "../../../../assets/used-files/icons/Google.svg";
import LinkedInIcon from "../../../../assets/used-files/icons/LinkedInSquare.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../../redux/Auth/authActions";
import { UserLoggedIn } from "../../../../Constant/index";

const LoginForm = ({ logoClassMain }) => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit1 = (e) => {
    setIsLoading(true); // Set loading to true before dispatching the action
    dispatch(
      login(formData, (resp) => {
        setIsLoading(false); // Set loading to false when data is received
        if (resp?.status == 200) {
          toast.success(UserLoggedIn);
          localStorage.setItem("accessToken", resp.data.tokens.access.token);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          navigate("/home");
        } else {
          const err = resp?.message;
          toast.error(err);
        }
      })
    );
  };

  return (
    <Fragment>
      <div className="login-card">
        <div>
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
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
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
                    placeholder="*******"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
            disabled: isLoading
          }}
        >
          <span>
            {isLoading ? (
              <>
                <i className="fa fa-spinner fa-spin" /> Loading...
              </>
            ) : (
              "Sign In"
            )}
          </span>
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

              <P attrPara={{ className: "text-center mb-0 mt-5" }}>
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
