import React, { Fragment, useState } from "react";
import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { Btn, H4, P, Image } from "../../../AbstractElements";
import { Eye, Info, Key, Linkedin, Mail, User } from "react-feather";
import Select from "react-select";
import linkedInIcon from "../../../assets/used-files/icons/settings/linkedIn.svg";
import { Link } from "react-router-dom";

const Profile = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%", // Match the width with other input fields
      minHeight: "44px",
      fontSize: "14px", // Match the font size with other input fields
      borderColor: "#efefef",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "14px", // Match the font size with other input fields
      padding: "10px 12px", // Adjust padding to reduce the height
    }),
  };
  return (
    <Fragment>
      <Container fluid={true}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <h6
            style={{ fontSize: "26px", fontWeight: 600 }}
            className="pt-5 pb-3"
          >
            Personal Information
          </h6>
        </div>{" "}
        <div style={{ width: "100%", textAlign: "center" }}>
          <Row>
            <Col
              xl="6"
              style={{
                textAlign: "left",
                paddingRight: "5%",
              }}
            >
              {" "}
              <div className="login-main">
                <Form className="theme-form login-form needs-validation">
                  <FormGroup>
                    <Label
                      className="col-form-label m-0"
                      style={{ fontSize: "14px", fontWeight: 600 }}
                    >
                      Email
                    </Label>

                    <InputGroup>
                      <InputGroupText
                        style={{
                          backgroundColor: "white",
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderRight: "none",
                          borderLeft: "1px solid #EBF1FC",
                        }}
                      ></InputGroupText>
                      <Input
                        style={{
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderLeft: "none",
                          borderRight: "none",
                          color: "#819ACB",
                        }}
                        type="email"
                        value="example@email.com"
                      />
                      <InputGroupText
                        style={{
                          backgroundColor: "white",
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderLeft: "none",
                          borderRight: "1px solid #EBF1FC",
                        }}
                      >
                        <span
                          style={{
                            color: "#1264FD",
                            fontSize: "13px",
                            fontWeight: 600,
                            paddingLeft: "10px",
                            cursor: "pointer",
                          }}
                        >
                          Change
                        </span>
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup id="PasswordValidationInput">
                    <Label
                      className="col-form-label m-0"
                      style={{ fontSize: "14px", fontWeight: 600 }}
                    >
                      Password
                    </Label>

                    <InputGroup>
                      <InputGroupText
                        style={{
                          backgroundColor: "white",
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderRight: "none",
                          borderLeft: "1px solid #EBF1FC",
                        }}
                      >
                        <Key strokeWidth={1} size={22} color="#819ACB" />
                      </InputGroupText>
                      <Input
                        style={{
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderLeft: "none",
                          borderRight: "none",
                          color: "#819ACB",
                        }}
                        type={togglePassword ? "text" : "password"}
                        value="111111111"
                      />

                      <InputGroupText
                        style={{
                          backgroundColor: "white",
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderLeft: "none",
                          borderRight: "1px solid #EBF1FC",
                        }}
                      >
                        <Eye
                          style={{
                            cursor: "pointer",
                          }}
                          strokeWidth={1}
                          size={18}
                          color="#819ACB"
                          onClick={() => setTogglePassword(!togglePassword)}
                        />
                        <span
                          style={{
                            color: "#AA1313",
                            fontSize: "14px",
                            fontWeight: 600,
                            paddingLeft: "10px",
                            cursor: "pointer",
                          }}
                        >
                          Reset
                        </span>
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label m-0">
                      First Name<span className="text-danger ms-1">*</span>
                    </Label>

                    <InputGroup>
                      <InputGroupText
                        style={{
                          backgroundColor: "white",
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderRight: "none",
                          borderLeft: "1px solid #EBF1FC",
                        }}
                      >
                        <User strokeWidth={1} size={22} color="#819ACB" />
                      </InputGroupText>
                      <Input
                        style={{
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderLeft: "none",
                          borderRight: "1px solid #EBF1FC",
                          color: "#819ACB",
                        }}
                        type="text"
                        value="John"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label m-0">
                      Last Name<span className="text-danger ms-1">*</span>
                    </Label>

                    <InputGroup>
                      <InputGroupText
                        style={{
                          backgroundColor: "white",
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderRight: "none",
                          borderLeft: "1px solid #EBF1FC",
                        }}
                      >
                        <User strokeWidth={1} size={22} color="#819ACB" />
                      </InputGroupText>
                      <Input
                        style={{
                          borderTop: "1px solid #EBF1FC",
                          borderBottom: "1px solid #EBF1FC",
                          borderLeft: "none",
                          borderRight: "1px solid #EBF1FC",
                          color: "#819ACB",
                        }}
                        type="text"
                        value="Doe"
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </div>
              <div className="gradientStyleHorizontal"></div>
            </Col>
            <Col
              xl="6"
              className="mt-2"
              style={{
                textAlign: "left",
                paddingLeft: "3%",
              }}
            >
              <p style={{ fontSize: "18px", fontWeight: 600 }}>
                LinkedIn Credentials
              </p>
              <p style={{ fontSize: "12px", fontWeight: 400 }} className="pb-4">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomized words which don't look even
                slightly believable.
              </p>

              <p className="pb-4">
                <span
                  style={{ fontSize: "14px", fontWeight: 600 }}
                  className="me-4"
                >
                  Assosiated linkedIn Account
                </span>
                <span
                  style={{ fontSize: "14px", fontWeight: 600 }}
                  className="ms-5"
                >
                  Martin Leonardo
                </span>
                <span>
                  <Image attrImage={{ src: linkedInIcon, className: "ms-2" }} />
                </span>
              </p>
              <p style={{ fontSize: "14px", fontWeight: 600 }}>
                Your Preferred LinkedIn Contract{" "}
                <Info strokeWidth={1} size={14} color="#8FA8D7" />
              </p>
              <p style={{ fontSize: "12px", fontWeight: 400 }}>
                Application only to sales Navigator / Recruiter users wth
                multiple LinkedIn contracts
              </p>
              <FormGroup>
                {" "}
                <Select styles={customStyles} name="jobPriority" />
              </FormGroup>
            </Col>

            <Col xl="12" style={{ textAlign: "right" }}>
              <Link className="btn btn-outline-light pe-4 ps-4 pt-2 pb-2 me-3">
                <span>Reset</span>
              </Link>
              <Link className="btn btn-primary  pe-4 ps-4 pt-2 pb-2">
                <span>Save</span>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Profile;
