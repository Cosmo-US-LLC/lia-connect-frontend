import { Fragment } from "react";
import { Line } from "./components/line";
import { Clock, MoreVertical } from "react-feather";
import { Col, FormGroup, Input, Row, UncontrolledTooltip } from "reactstrap";
import { H6 } from "../../../../../AbstractElements";
import { Sequence } from "./sequence";
export const SingleOption = ({ sequence, sequenceArray, setSequenceArray }) => {
  return (
    <Fragment>
      <Line marginBottom={10} marginTop={10} />
      <div>
        <div
          style={{
            border: "1px dashed  #DADADA",
            boxShadow: "0px 6px 20px 0px #0000000F",
            borderRadius: "4px",
            color: "black",
            backgroundColor: "#FFEFBD",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              padding: "10px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Clock size={15} strokeWidth={1} />
          </span>
          <span style={{ color: "#595959", padding: "10px" }}> 14 hours </span>

          <button
            id="priorityToolTip"
            className="d-flex"
            style={{
              cursor: "pointer",
              border: "none",
              backgroundColor: "transparent",
              fontWeight: "600",
              color: "black",
            }}
          >
            <MoreVertical size={15} strokeWidth={3} />

            <UncontrolledTooltip
              // isOpen={true}
              target="priorityToolTip"
              placement="bottom"
              style={{
                backgroundColor: "white",
                boxShadow: "0px 6px 26px -3.89px #0000001A",
              }}
            >
              <div
                style={{
                  width: "100%",
                  left: "300px",
                }}
              >
                <div
                  className="mb-3"
                  style={{
                    color: "#595959",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "19.2px",
                    textAlign: "center",
                  }}
                >
                  Delay before the next action:
                </div>
                <div>
                  <FormGroup style={{ textAlign: "left" }}>
                    <Row>
                      <Col xl="4">
                        <Input
                          className="form-control"
                          type="text"
                          name="jobName"
                          value={sequence.delayTillNextActionValue}
                        />
                      </Col>
                      <Col xl="8">
                        <Input
                          className="form-control"
                          type="select"
                          name="jobName"
                          value={sequence.delayTillNextActionType}
                        >
                          <option className="form-control" value="d">
                            Days
                          </option>
                          <option className="form-control" value="h">
                            Hours
                          </option>
                          <option className="form-control" value="w">
                            {" "}
                            Week
                          </option>
                        </Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </div>
              </div>
            </UncontrolledTooltip>
          </button>
        </div>
      </div>
      <Line marginBottom={10} marginTop={10} />
    </Fragment>
  );
};
