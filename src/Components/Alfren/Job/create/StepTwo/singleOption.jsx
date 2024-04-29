import { Fragment, useState } from "react";
import { Line } from "./components/line";
import { Clock, MoreVertical } from "react-feather";
import { Col, FormGroup, Input, Row, UncontrolledTooltip } from "reactstrap";
import { H6 } from "../../../../../AbstractElements";
import { Sequence } from "./sequence";
import { DelayDropdown } from "./components/delayDropdown";
export const SingleOption = ({ sequence, sequenceArray, setSequenceArray }) => {
  const [dropdownActive, setDropdownActive] = useState(false);
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
          <span style={{ color: "#595959", padding: "10px" }}>
            {sequence.delayTillNextActionValue}
            {sequence.delayTillNextActionType === "h"
              ? " hours"
              : sequence.delayTillNextActionType === "d"
              ? " days"
              : sequence.delayTillNextActionType === "w"
              ? " weeks"
              : ""}
          </span>

          <button
            id={"alfren" + sequence.sequenceId + "alfren"}
            className="d-flex"
            style={{
              cursor: "pointer",
              border: "none",
              backgroundColor: "transparent",
              fontWeight: "600",
              color: "black",
            }}
            onClick={() => setDropdownActive(true)}
          >
            <MoreVertical size={15} strokeWidth={3} />
          </button>
          <DelayDropdown
            target={"alfren" + sequence.sequenceId + "alfren"}
            sequence={sequence}
            dropdownActive={dropdownActive}
            setDropdownActive={setDropdownActive}
            sequenceArray={sequenceArray}
            setSequenceArray={setSequenceArray}
          />
        </div>
      </div>
      <Line marginBottom={10} marginTop={10} />
    </Fragment>
  );
};
