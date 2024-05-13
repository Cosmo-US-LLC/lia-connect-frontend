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
  Media,
  Row,
} from "reactstrap";
import { Btn, H4, P, Image, Progressbar } from "../../../AbstractElements";
import { Eye, Info, Key, Linkedin, Mail, User } from "react-feather";
import Select from "react-select";
import linkedInIcon from "../../../assets/used-files/icons/settings/linkedIn.svg";
import { Link } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";

const Sequence = () => {
  const [values1, setValues1] = useState([70]);
  const [values2, setValues2] = useState([85]);
  const [values3, setValues3] = useState([43]);
  const [values4, setValues4] = useState([50]);
  const [linkedInActivity, setLinkedInActivity] = useState(false);

  return (
    <Fragment>
      <Container fluid={true}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: "26px", fontWeight: 600 }} className="pt-5">
            Campaign Sequence
          </p>
          <p style={{ fontSize: "12px", fontWeight: 400 }} className="pb-3">
            Maximum number of LinkedIn actions per day{" "}
          </p>
        </div>
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
                <Col>
                  <span>Connection Requests</span>
                  <Range
                    disabled={linkedInActivity ? true : false}
                    values={values1}
                    step={1}
                    min={0}
                    max={100}
                    onChange={(values1) => setValues1(values1)}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values: values1,
                              colors: linkedInActivity
                                ? ["#EBF1FC", "#fff"]
                                : ["#1264FD", "#fff"],
                              min: 0,
                              max: 100,
                            }),
                            alignSelf: "center",
                          }}
                        >
                          <div
                            ref={props.ref}
                            style={{
                              height: "5px",
                              width: "100%",
                              borderRadius: "4px",
                              background: linkedInActivity
                                ? "transparent"
                                : `linear-gradient(to right, transparent 0%, transparent 75%, #FFD700 75%, #FFD700 95%, transparent 95%, transparent 100%)`,
                              boxShadow: " 0px 1px 7px 0px #0000001A inset",
                              alignSelf: "center",
                            }}
                          >
                            {children}
                          </div>
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "15px",
                          width: "15px",
                          borderRadius: "30px",
                          backgroundColor: linkedInActivity
                            ? "#EBF1FC"
                            : "#1264FD",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                          border: "1px solid white",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            marginBottom: "50px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 400,
                              paddingRight: "10px",
                              paddingLeft: "10px",
                              background: "white",
                              boxShadow: "0px 4px 16px 0px #0000002B",
                              borderRadius: "4px",
                            }}
                          >
                            {values1}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </Col>
                <Col>
                  <span>Message</span>
                  <Range
                    disabled={linkedInActivity ? true : false}
                    values={values2}
                    step={1}
                    min={0}
                    max={100}
                    onChange={(values2) => setValues2(values2)}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values: values2,
                              colors: linkedInActivity
                                ? ["#EBF1FC", "#fff"]
                                : ["#1264FD", "#fff"],
                              min: 0,
                              max: 100,
                            }),
                            alignSelf: "center",
                          }}
                        >
                          <div
                            ref={props.ref}
                            style={{
                              height: "5px",
                              width: "100%",
                              borderRadius: "4px",
                              background: linkedInActivity
                                ? "transparent"
                                : `linear-gradient(to right, transparent 0%, transparent 75%, #FFD700 75%, #FFD700 95%, transparent 95%, transparent 100%)`,
                              boxShadow: " 0px 1px 7px 0px #0000001A inset",
                              alignSelf: "center",
                            }}
                          >
                            {children}
                          </div>
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "15px",
                          width: "15px",
                          borderRadius: "30px",
                          backgroundColor: linkedInActivity
                            ? "#EBF1FC"
                            : "#1264FD",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                          border: "1px solid white",
                        }}
                      >
                        <div
                          style={{
                            marginBottom: "50px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 400,
                              paddingRight: "10px",
                              paddingLeft: "10px",
                              background: "white",
                              boxShadow: "0px 4px 16px 0px #0000002B",
                              borderRadius: "4px",
                            }}
                          >
                            {values2}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </Col>
                <Col>
                  <span>Profile View</span>
                  <Range
                    disabled={linkedInActivity ? true : false}
                    values={values3}
                    step={1}
                    min={0}
                    max={100}
                    onChange={(values3) => setValues3(values3)}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values: values3,
                              colors: linkedInActivity
                                ? ["#EBF1FC", "#fff"]
                                : ["#1264FD", "#fff"],
                              min: 0,
                              max: 100,
                            }),
                            alignSelf: "center",
                            boxShadow: " 0px 1px 7px 0px #0000001A inset",
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "15px",
                          width: "15px",
                          borderRadius: "30px",
                          backgroundColor: linkedInActivity
                            ? "#EBF1FC"
                            : "#1264FD",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                          border: "1px solid white",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            marginBottom: "50px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 400,
                              paddingRight: "10px",
                              paddingLeft: "10px",
                              background: "white",
                              boxShadow: "0px 4px 16px 0px #0000002B",
                              borderRadius: "4px",
                            }}
                          >
                            {values3}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </Col>
                <Col>
                  <span>Withdrawal Connection Request</span>
                  <Range
                    disabled={linkedInActivity ? true : false}
                    values={values4}
                    step={1}
                    min={0}
                    max={100}
                    onChange={(values4) => setValues4(values4)}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values: values4,
                              colors: linkedInActivity
                                ? ["#EBF1FC", "#fff"]
                                : ["#1264FD", "#fff"],
                              min: 0,
                              max: 100,
                            }),
                            alignSelf: "center",
                            boxShadow: " 0px 1px 7px 0px #0000001A inset",
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "15px",
                          width: "15px",
                          borderRadius: "30px",
                          backgroundColor: linkedInActivity
                            ? "#EBF1FC"
                            : "#1264FD",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                          border: "1px solid white",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            marginBottom: "50px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 400,
                              paddingRight: "10px",
                              paddingLeft: "10px",
                              background: "white",
                              boxShadow: "0px 4px 16px 0px #0000002B",
                              borderRadius: "4px",
                            }}
                          >
                            {values4}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </Col>
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
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  borderBottom: "1px solid #E8E8E8",
                }}
                className="pb-4"
              >
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomized words which don't look even
                slightly believable.
              </p>

              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginTop: "5%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  LinkedIn Activity Control
                  <Info
                    strokeWidth={1}
                    size={14}
                    color="#8FA8D7"
                    className="ms-2"
                  />
                </span>
                <span style={{ marginRight: "10%" }}>
                  <Media key="1">
                    <Media body className="text-start switch-sm ">
                      <Label className="switch">
                        <Input
                          type="checkbox"
                          onClick={() => setLinkedInActivity(!linkedInActivity)}
                        />
                        <span className="switch-state"></span>
                      </Label>
                    </Media>
                  </Media>{" "}
                </span>
              </p>

              <FormGroup> </FormGroup>
            </Col>

            <Col
              xl="12"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <Link className="btn pe-4 ps-4 pt-2 pb-2 me-3">
                <span>Reset to Default</span>
              </Link>
              <div>
                <Link className="btn btn-outline-light pe-4 ps-4 pt-2 pb-2 me-3">
                  <span>Reset</span>
                </Link>
                <Link className="btn btn-primary  pe-4 ps-4 pt-2 pb-2">
                  <span>Save</span>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sequence;
