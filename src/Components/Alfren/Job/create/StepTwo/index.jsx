import React, { Fragment, useEffect, useState } from "react";
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
  Card,
} from "reactstrap";
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
import { Btn } from "../../../../../AbstractElements";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Actions } from "./actions";

import { SequenceStart } from "./startSequence";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { stepTwo } from "../../../../../redux/Job/jobActions";
import NestedSequence from "./nestedSequence";
import { SEQUENCE_DATA } from '../../../../../Constant/CreateJob';
const StepTwo = ({
  handlePrevious,
  handleNext,
  jobId
}) => {
  const dispatch = useDispatch();
  const configMessage = useSelector((state) => state.message.content);
  console.log('configMessage', configMessage)
  const [zoomLevel, setZoomLevel] = useState([40]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [sequence, setSequence] = useState();
  console.log('sequence', sequence)
  const [sequenceArray, setSequenceArray] = useState(SEQUENCE_DATA);
  console.log('sequenceArray sequenceArraysequenceArraysequenceArraysequenceArray', sequenceArray)
  const message = sequence?.input
    ? sequence?.input
    : "<p>Update on Your Job Application</p><p>Dear [Candidate's Name],</p><p>I hope this email finds you well.</p><p>I wanted to reach out and thank you for your interest in the [Job Title] position at [Company Name]. We appreciate the time and effort you've invested in the application process.</p><p>After careful consideration, we regret to inform you that we have decided to pursue other candidates whose qualifications more closely align with the requirements of the role.</p><p>Please know that this decision was not made lightly, and we genuinely appreciate the opportunity to learn about your skills and experiences. We encourage you to continue pursuing opportunities that match your expertise and career goals.</p><p>Thank you once again for your interest in joining our team. We wish you all the best in your future endeavors.</p><p>Warm regards,</p><p>[Your Name]<br>[Your Position]<br>[Company Name]<br>[Contact Information]</p>";

  const [editorContent, setEditorContent] = useState(message);
  console.log('editorContent', editorContent)
  function transformSequenceRecords(records) {
    const map = new Map();

    // Create a map with sequenceId as keys
    for (const record of records) {
      map.set(record.sequenceId, { ...record, children: [] });
    }

    // Build the tree structure
    for (const record of records) {
      if (record.parentSequenceId && map.has(record.parentSequenceId)) {
        const parent = map.get(record.parentSequenceId);
        parent.children.push(map.get(record.sequenceId));
      }
    }

    // Find and return the root node
    let rootNode;
    for (const record of records) {
      if (!record.parentSequenceId) {
        rootNode = map.get(record.sequenceId);
        break;
      }
    }

    return rootNode;
  }


  useEffect(() => {
    const transformed = transformSequenceRecords(sequenceArray);
    console.log('transformed', transformed)
    console.log("dgdfg", transformed, sequenceArray);
    setSequence(transformed);
  }, [sequenceArray]);



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
    const handleZoomChange = (event) => {
      setZoomLevel(event.target.value);
    };


    return (
      <div style={{ position: "fixed", zIndex: "1", top: 450 }}>
        <ButtonGroup
          vertical
          style={{
            borderRadius: "8px",
          }}
        >
          <button
            className="btn no-outline border-0"
            style={{ outline: 'none' }}
            onClick={() => handleZoonIn()}
          >
            <div className="d-inline-flex">
              <ZoomIn style={{ position: 'relative', bottom: '43px' }} strokeWidth={0.5} color="#8FA8D7" />{" "}
            </div>
          </button>
          <Btn
            attrBtn={{
              color: "transparent",

            }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={zoomLevel}
              onChange={handleZoomChange}
              style={{ rotate: "-90deg", height: '2.5px' }}
            />
          </Btn>

          <button
            className="btn no-outline border-0"

            onClick={() => handleZoonOut()}
          >
            <div className="d-inline-flex">
              <ZoomOut style={{ position: 'relative', top: '53px' }} strokeWidth={0.5} color="#8FA8D7" />{" "}
            </div>
          </button>
        </ButtonGroup>
      </div>
    );
  };
  const submitStepTwo = async (e) => {
    setIsLoading(true);
  
    // Filter sequenceArray to include only objects with actionName "Send Connection"
    const formattedSequenceArray = sequenceArray.map((item) => {
      // Check if the current item's actionName is "Send Connection"
      if (item.actionName === "Send Connection") {
        // Return a new object with the existing properties and added config payload
        return {
          ...item,
          config: configMessage,
        };
      }
      // Return the item as is if actionName is not "Send Connection"
      return item;
    });
  
    const formData = {
      jobId,
      body: { jobSequence: formattedSequenceArray },
    };
  
    try {
      const resp = await dispatch(stepTwo(formData));
      setIsLoading(false);
      if (resp.status === 201) {
        toast.success("Sequence Added Successfully");
        handleNext(e);
      } else {
        const err = resp.message;
        toast.error(err);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting step two:", error);
      toast.error("Failed to add sequence. Please try again.");
    }
  };
  
  return (
    <Fragment>
      <DndProvider backend={HTML5Backend}>
        <Container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              position: "fixed",
              right: 40,
              zIndex: "1",
              bottom: "20px"
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
                  className: "pt-3 pb-3 ps-4 pe-4 display-flex-style flex-column ",
                }}
              >
                <Link
                  onClick={handleResetButton}
                  className="btn btn-outline-dark pe-5 ps-5 pt-2 pb-2 mb-2"
                  style={{ opacity: sequenceArray.length !== 2 ? "100%" : "60%" }}
                >
                  <span>Reset</span>
                </Link>
                <Link
                  disabled={isLoading || sequenceArray.length !== 2}
                  onClick={handleNextStep}
                  className="btn btn-primary pe-5 ps-5 pt-2 pb-2"
                  style={{ opacity: isLoading ? "60%" : "100%" }}
                >
                  <span>
                    {isLoading ? (
                      <>
                        <i className="fa fa-spinner fa-spin" /> Loading...
                      </>
                    ) : (
                      "Next"
                    )}
                  </span>
                </Link>

              </Btn>
            </Card>
          </div>
          <div style={{
            position: "fixed", zIndex: "1", bottom: 30, width: "70%",
            marginLeft: "-1000px"
          }}>
            <Link
              onClick={handleBackStep}
              className="btn  pt-2 pb-2 d-inline-flex"
            >
              <ChevronLeft strokeWidth={1} color="#8FA8D7" />
              <span style={{ color: "#595959" }}>
                Back
              </span>
            </Link>
          </div>
          <Row style={{ width: "100%", height: '100vh' }}>
            <span
              style={{ textAlign: "left", fontWeight: "400", fontSize: "13px" }}
              className="mt-4"
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
                              setEditorContent={setEditorContent}
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
