import React, { Fragment, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
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
import { NestedSequence } from "./nestedSequence";
import { SequenceStart } from "./startSequence";
import { Data } from "emoji-mart";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { stepTwo } from "../../../../../redux/Job/jobActions";

const StepTwo = ({
  handlePrevious,
  handleNext,
  sequence,
  sequenceArray,
  setSequenceArray,
  jobId
}) => {
  const dispatch = useDispatch();
  const [nextActive, setNextActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState([40]);
  const handleResetButton = (e) => {
    e.preventDefault(e);
    setSequenceArray([]);
  };

  const handleNextStep = (e) => {
    e.preventDefault(e);
    submitStepTwo(e);
  };
  const handleBackStep = (e) => {
    e.preventDefault(e);
    handlePrevious(e);
  };

  const addSequenceRecord = (data) => {
    setSequenceArray((sequenceArray) => [...sequenceArray, data]);
  };

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    const handleZoonIn = () => {
      const zoom = parseInt(zoomLevel) + 10;

      if (zoom <= 100) {
        zoomIn();
        setZoomLevel(zoom);
      }
    };
    const handleZoonOut = () => {
      const zoom = parseInt(zoomLevel) - 10;

      if (zoom >= 0) {
        zoomOut();
        setZoomLevel(zoom);
      }
    };
    return (
      <div style={{ position: "fixed", zIndex: "1", top: 450 }}>
        <ButtonGroup
          vertical
          style={{
            // border: "1px solid #8FA8D7 ",
            borderRadius: "8px",
            // boxShadow: " 0px 0px 32px 0px #3D64FF94",
          }}
        >
          <button
            className="btn"
            style={{
              border: "1px solid #8FA8D7 ",
              backgroundColor: "white",
            }}
            onClick={() => handleZoonIn()}
          >
            <div className="d-inline-flex">
              <ZoomIn strokeWidth={0.5} color="#8FA8D7" />{" "}
            </div>
          </button>
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

          <button
            className="btn"
            style={{
              border: "1px solid #8FA8D7 ",
              backgroundColor: "white",
            }}
            onClick={() => handleZoonOut()}
          >
            <div className="d-inline-flex">
              <ZoomOut strokeWidth={0.5} color="#8FA8D7" />{" "}
            </div>
          </button>
        </ButtonGroup>
      </div>
    );
  };

  const submitStepTwo= async (e) => {
    const formData = {
      jobId,
      body:{jobSequence: sequenceArray}
    };
    dispatch(
      stepTwo(formData, (resp) => {
        if (resp.status == 201) {
          toast.success("Sequence Added Successfully");
          handleNext(e);
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };
  return (
    <Fragment>
      <DndProvider backend={HTML5Backend}>
        <Container>
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
                    className="pt-3 pb-3"
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
                  <Actions
                    key={1}
                    id={1}
                    name={"View Profile"}
                    color={"#A8A7A7"}
                    addSequenceRecord={addSequenceRecord}
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
                  {" "}
                  <GitMerge strokeWidth={1} color="#1D1D1D" />
                  <Actions
                    key={2}
                    id={2}
                    name={"Send Connection"}
                    color={"#A8A7A7"}
                    addSequenceRecord={addSequenceRecord}
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
                    key={3}
                    id={3}
                    name={"Withdraw Connection"}
                    color={"#A8A7A7"}
                    addSequenceRecord={addSequenceRecord}
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
                  <Actions
                    key={4}
                    id={4}
                    name={"Send a Message"}
                    color={"#A8A7A7"}
                    addSequenceRecord={addSequenceRecord}
                  />
                </Btn>
              </ButtonGroup>
              <Btn
                attrBtn={{
                  color: "white",
                  className: "pt-3 pb-3 ps-4 pe-4",
                }}
              >
                <Link
                  onClick={handleResetButton}
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
          <Row style={{ width: "100%" }}>
            <span
              style={{ textAlign: "left", fontWeight: "400", fontSize: "10px" }}
              className="mt-5 mb-5"
            >
              * To ensure that the system performs at the optimal efficiency,
              you can have up to 5 active jobs at a time.
            </span>
            <Col sm="12">
              {sequence ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      height: "100vh",
                    }}
                  >
                    <TransformWrapper
                      centerOnInit={true}
                      onWheelStart={false}
                      wheel={{ wheelDisabled: true }}
                      minScale={0.2}
                    >
                      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <>
                          <Controls />
                          <TransformComponent>
                            <NestedSequence
                              sequence={sequence}
                              sequenceArray={sequenceArray}
                              setSequenceArray={setSequenceArray}
                              addSequenceRecord={addSequenceRecord}
                            />
                          </TransformComponent>
                        </>
                      )}
                    </TransformWrapper>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <SequenceStart />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </DndProvider>
    </Fragment>
  );
};

export default StepTwo;
