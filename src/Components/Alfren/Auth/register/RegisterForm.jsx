import React, { Fragment, useState } from "react";

import { Btn, H4, H6, Image, P, ToolTip } from "../../../../AbstractElements";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
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
  User,
  X,
} from "react-feather";

import logoWhite from "../../../../assets/images/logo/logo.svg";
import logoDark from "../../../../assets/images/logo/logo_dark.png";
import OrIcon from "../../../../assets/used-files/images/auth/Or.svg";
import GoogleIcon from "../../../../assets/used-files/icons/Google.svg";
import LinkedInIcon from "../../../../assets/used-files/icons/LinkedInSquare.svg";
import { useForm } from "react-hook-form";
import man from "../../../../assets/images/dashboard/profile.png";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "../../../../redux/Auth/authActions";
import { useDispatch } from "react-redux";
import { UserRegistered } from "../../../../constant/index";

const RegisterForm = ({ logoClassMain }) => {
  const [error, setError] = useState(true);
  const [togglePassword, setTogglePassword] = useState(false);
  // const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [basictooltip, setbasictooltip] = useState(false);
  const toggle = () => setbasictooltip(!basictooltip);
  // const [confirmPasswordMatched, setConfirmPasswordMatched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const passwordRequirements = [
    { text: "Atleast 1 letter should be uppercase.", status: 0 },
    { text: "Atleast 1 special character include.", status: 0 },
    { text: "Atleast 1 number include.", status: 0 },
    { text: "Password should be 8 letter long.", status: 0 },
  ];
  const [requirements, setRequirements] = useState(passwordRequirements);

  const handleChange = (e) => {
    if (e.target.name == "password") {
      const password = e.target.value;

      // Update requirements based on entered password
      const updatedRequirements = passwordRequirements.map((requirement) => {
        const upperCase = /[A-Z]/.test(password);
        const number = /[0-9]/.test(password);
        const symbol = /[!@#$%^&*()_+\-=[\]{};':",./<>?|\\ ]/.test(password);

        setError(true);

        switch (requirement.text) {
          case "Password should be 8 letter long.":
            return {
              ...requirement,
              status: password.length >= 8 ? 1 : 0,
            };
          case "Atleast 1 special character include.":
            return {
              ...requirement,
              status: symbol ? 1 : -1,
            };
          case "Atleast 1 number include.":
            return {
              ...requirement,
              status: number ? 1 : -1,
            };
          case "Atleast 1 letter should be uppercase.":
            return {
              ...requirement,
              status: upperCase ? 1 : -1,
            };
          default:
            return requirement; // Keep other requirements unchanged
        }
      });
      console.log("pppp", updatedRequirements);

      const hasUnfulfilledRequirement = updatedRequirements.some(
        (requirement) => requirement.status <= 0
      );

      console.log("hhhh", hasUnfulfilledRequirement);
      setError(hasUnfulfilledRequirement);

      setRequirements(updatedRequirements);
    } 
    // else if (e.target.name == "confirmPassword") {
    //   setConfirmPasswordMatched(
    //     formData.password !== e.target.value ? false : true
    //   );
    // }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit1 = (e) => {
    setIsLoading(true)
    if (error || isFormEmpty()) {
      toast.error("Please fill out all fields!");
      setIsLoading(false); // Set isLoading to false here
    } else {
      dispatch(
        registerUser(formData, (resp) => {
          if (resp.status == 201) {
            setIsLoading(false)
            toast.success(UserRegistered);
            setFormData(initialState);
            navigate("/auth/login");
          } else {
            const err = resp.message;
            if (Array.isArray(err)) {
              err.forEach((element) => {
                toast.error(element);
              });
            } else {
              toast.error(err);
            }
            setIsLoading(false) // Set isLoading to false here
          }
        })
      );
    }
  };

  const isFormEmpty = () => {
    return Object.values(formData).some((value) => value.trim() === "");
  };

  return (
    <Fragment>
      <div className="login-card">
        <div>
          <div className="login-main">
            <Form
              className="theme-form login-form needs-validation"
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
                Sign Up
                {/* Registeration 👋 */}
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
                Sign up to Alfren HR and start headhunting the top talent on Linkedin.
                {/* Today is a new day. It's your day. You shape it. Sign up to
                start managing your projects. */}
              </P>
              <Row>
                <Col xl="6">
                  <FormGroup>
                    <Label className="col-form-label m-0">
                      First Name<span className="text-danger ms-1">*</span>
                    </Label>

                    <InputGroup>
                      <InputGroupText>
                        <User strokeWidth={0.5} size={16} />
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder="John"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="col-form-label m-0">
                      Last Name<span className="text-danger ms-1">*</span>
                    </Label>

                    <InputGroup>
                      <InputGroupText>
                        <User strokeWidth={0.5} size={16} />
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder="Doe"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

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
              <FormGroup id="PasswordValidationInput">
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
                    placeholder="*********"
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

                <ToolTip
                  attrToolTip={{
                    placement: "left",
                    isOpen: basictooltip,
                    target: "PasswordValidationInput",
                    toggle: toggle,
                    style: {
                      backgroundColor: "white",
                      boxShadow: "0px 5px 10px -3.89px #00000040",
                    },
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      left: "300px",
                      textAlign: "left",
                      backgroundColor: "white",
                    }}
                  >
                    {requirements.map((element, index) => (
                      <div
                        style={{
                          color:
                            element.status === 0
                              ? "#595959"
                              : element.status === -1
                                ? "#AA1313"
                                : "#299A16",
                        }}
                      >
                        {element.status === 0 ? (
                          <Circle strokeWidth={0.5} size={7} />
                        ) : element.status === -1 ? (
                          <X strokeWidth={0.5} size={7} />
                        ) : (
                          <Check strokeWidth={0.5} size={7} />
                        )}

                        <span style={{ fontSize: "10px", marginLeft: "4px" }}>
                          {element.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </ToolTip>
              </FormGroup>

              {/* <FormGroup>
                <Label className="col-form-label m-0">
                  Confirm Password
                  <span className="text-danger ms-1">*</span>
                </Label>

                <InputGroup>
                  <InputGroupText>
                    <Key strokeWidth={0.5} size={16} />
                  </InputGroupText>
                  <Input
                    type={toggleConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="**********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <InputGroupText>
                    <Eye
                      strokeWidth={0.5}
                      size={16}
                      onClick={() =>
                        setToggleConfirmPassword(!toggleConfirmPassword)
                      }
                    />
                  </InputGroupText>
                </InputGroup>
              </FormGroup> */}

              {/* <FormGroup>
                <div
                  style={{
                    color: confirmPasswordMatched ? "white" : "#AA1313",
                  }}
                >
                  <AlertTriangle strokeWidth={0.5} size={7} />
                  <span style={{ fontSize: "10px", marginLeft: "4px" }}>
                    Confirm Password Not matched
                  </span>
                </div>
              </FormGroup> */}

              <FormGroup>
                <Btn
                  attrBtn={{
                    className: "d-block w-100 mt-4",
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
                      "Register"
                    )}
                  </span>
                </Btn>
              </FormGroup>

              {/* <div className="login-social-title text-center">
                <Image attrImage={{ src: OrIcon }} />
              </div> */}

              {/* <div className="social my-4 text-center ">
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
              </div> */}

              <P attrPara={{ className: "text-center mb-0 mt-4" }}>
                Already have an account?
                <Link
                  className="ms-2"
                  to={`${process.env.PUBLIC_URL}/auth/login`}
                  style={{
                    color: "#1264FD",
                    fontSize: "12px",
                    fontWeight: "600",
                    lineHeight: "19.2px",
                    textAlign: "center",
                  }}
                >
                  Sign In
                </Link>
              </P>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterForm;
