import React, { Fragment, useState } from "react";
import dragula from "react-dragula";
import {
  ButtonGroup,
  Col,
  Container,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardBody,
  Card,
} from "reactstrap";
import { Direction, Range, getTrackBackground } from "react-range";
import {
  ChevronLeft,
  Eye,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  ZoomIn,
  ZoomOut,
} from "react-feather";
import { Link } from "react-router-dom";
import { Btn, LI, UL } from "../../../../../AbstractElements";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Actions } from "./actions";

import { Sequence } from "./sequence";
import { BackgroundColor } from "../../../../../Constant";
const StepTwo = ({ handlePrevious, handleNext, sequence, setSequence }) => {
  const [nextActive, setNextActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState([60]);
  const handleNextStep = (e) => {
    e.preventDefault(e);
    handleNext(e);
  };
  const handleBackStep = (e) => {
    e.preventDefault(e);
    handlePrevious(e);
  };

  return (
    <Fragment>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <div style={{ position: "fixed", zIndex: "1", top: 450 }}>
            <ButtonGroup
              vertical
              style={{
                // border: "1px solid #8FA8D7 ",
                borderRadius: "8px",
                // boxShadow: " 0px 0px 32px 0px #3D64FF94",
              }}
            >
              <Btn
                attrBtn={{
                  color: "white",
                  style: {
                    border: "1px solid #8FA8D7 ",
                  },
                }}
              >
                <div className="d-inline-flex">
                  <ZoomIn strokeWidth={0.5} color="#8FA8D7" />{" "}
                </div>
              </Btn>
              <Btn
                attrBtn={{
                  color: "white",
                  style: {
                    border: "1px solid #8FA8D7 ",
                  },
                }}
              >
                <span style={{ color: "#8FA8D7" }}>{zoomLevel + "%"}</span>
              </Btn>

              <Btn
                attrBtn={{
                  color: "white",
                  style: {
                    border: "1px solid #8FA8D7 ",
                  },
                }}
              >
                <div className="d-inline-flex">
                  <ZoomOut strokeWidth={0.5} color="#8FA8D7" />{" "}
                </div>
              </Btn>
            </ButtonGroup>
          </div>
          <div
            style={{
              position: "fixed",
              right: 40,
              top: 170,
              width: "12%",
              zIndex: "1",
            }}
          >
            <Card className="p-2">
              <ButtonGroup vertical>
                <Btn
                  attrBtn={{
                    color: "white",
                    className: "pt-3 pb-3 ps-4 pe-4",

                    style: {
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "black",
                      backgroundColor: "#F5F9FF",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <span
                    className="pt-3 pb-3 ps-4 pe-4"
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "black",
                      backgroundColor: "#F5F9FF",
                    }}
                  >
                    Actions
                  </span>
                </Btn>
                <Btn
                  attrBtn={{
                    color: "white",
                    className: "pt-3 pb-3 ps-4 pe-4",
                    style: {
                      borderBottom: "1px solid #F0F0F0",
                    },
                  }}
                >
                  <Eye strokeWidth={1} color="#1D1D1D" />
                  <Actions id={1} name={"View Profile"} color={"#A8A7A7"} />
                </Btn>

                <Btn
                  attrBtn={{
                    className: "pt-3 pb-3 ps-4 pe-4 mt-2",
                    color: "white",
                    style: {
                      borderBottom: "1px solid #F0F0F0",
                    },
                  }}
                >
                  {" "}
                  <GitMerge strokeWidth={1} color="#1D1D1D" />
                  <Actions
                    id={2}
                    name={"Send Connection Request"}
                    color={"#A8A7A7"}
                  />
                </Btn>
                <Btn
                  attrBtn={{
                    className: "pt-3 pb-3 ps-4 pe-4 mt-2",
                    color: "white",
                    style: {
                      borderBottom: "1px solid #F0F0F0",
                    },
                  }}
                >
                  <GitPullRequest strokeWidth={1} color="#1D1D1D" />
                  <Actions
                    id={2}
                    name={"Withdraw Connection Request"}
                    color={"#A8A7A7"}
                  />
                </Btn>
                <Btn
                  attrBtn={{
                    className: "pt-3 pb-3 ps-4 pe-4 mt-2",
                    color: "white",
                    style: {
                      borderBottom: "1px solid #F0F0F0",
                    },
                  }}
                >
                  <MessageSquare strokeWidth={1} color="#1D1D1D" />
                  <Actions id={2} name={"Send a Message"} color={"#A8A7A7"} />
                </Btn>
              </ButtonGroup>
              <Btn
                attrBtn={{
                  color: "white",
                  className: "pt-3 pb-3 ps-4 pe-4",
                }}
              >
                <Link
                  onClick={handleNextStep}
                  className="btn btn-outline-dark pe-5 ps-5 pt-2 pb-2 mb-2"
                  style={{ opacity: nextActive ? "100%" : "60%" }}
                >
                  <span>Reset</span>
                </Link>
                <Link
                  onClick={handleNextStep}
                  className="btn btn-primary pe-5 ps-5 pt-2 pb-2"
                  style={{ opacity: nextActive ? "100%" : "60%" }}
                >
                  <span>Next</span>
                </Link>
              </Btn>
            </Card>
          </div>
          <div style={{ position: "fixed", zIndex: "1", bottom: 30 }}>
            <Link
              onClick={handleBackStep}
              className="btn  pt-2 pb-2 d-inline-flex"
            >
              <ChevronLeft strokeWidth={1} color="#8FA8D7" />
              <span className="ms-3" style={{ color: "#595959" }}>
                Back
              </span>
            </Link>
          </div>
        </Container>
        <Row>
          <Col sm="12">
            {sequence.length ? (
              <>
                <Sequence name={"A"}>
                  <Sequence name={"b"}>
                    <Sequence name={"c"}>
                      <Sequence name={"c"} />
                    </Sequence>
                  </Sequence>
                </Sequence>
              </>
            ) : (
              <>
                {" "}
                <Sequence firstNode={true} />
              </>
            )}
          </Col>
        </Row>
      </DndProvider>
    </Fragment>
  );
};

export default StepTwo;
