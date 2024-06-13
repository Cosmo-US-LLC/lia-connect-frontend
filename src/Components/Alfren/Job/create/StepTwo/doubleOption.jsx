import { Fragment, useState } from "react";
import  Line  from "./components/line";
import { Clock, MoreVertical } from "react-feather";
import { HorizontalLine } from "./components/horizontalLine";
import { DelayDropdown } from "./components/delayDropdown";
const DoubleOption = ({ sequence, sequenceArray, setSequenceArray }) => {
  const [dropdownActive, setDropdownActive] = useState([false, false]);
  const setActiveDropdown = (index) => {
    const newDropdownActive = [...dropdownActive]; // Create a copy of the current state
    newDropdownActive[index] = true; // Toggle the state of the dropdown at the specified index
    setDropdownActive(newDropdownActive);
  };

  const setCloseDropdown = (index) => {
    const newDropdownActive = [...dropdownActive]; // Create a copy of the current state
    newDropdownActive[index] = false; // Toggle the state of the dropdown at the specified index
    setDropdownActive(newDropdownActive);
  };
  return (
    <Fragment>
      <Line marginBottom={0} marginTop={10} />
      <HorizontalLine />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {sequence?.options?.map((item, index) => (
          <div>
            <div>
              <span style={{ color: "#819ACB" }}>{item.name}</span>

              <Line marginBottom={10} marginTop={10} />
            </div>
            <div
              key={index}
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
                {item.delayTillNextActionValue}
                {item.delayTillNextActionType === "h"
                  ? " hours"
                  : item.delayTillNextActionType === "d"
                  ? " days"
                  : item.delayTillNextActionType === "w"
                  ? " weeks"
                  : ""}
              </span>

              <button
                id={"alfren" + sequence.sequenceId + item.id + "alfren"}
                className="d-flex"
                style={{
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent",
                  fontWeight: "600",
                  color: "black",
                }}
                onClick={() => setActiveDropdown(index)}
              >
                <MoreVertical size={15} strokeWidth={3} />
              </button>
              <DelayDropdown
                index={index}
                target={"alfren" + sequence.sequenceId + item.id + "alfren"}
                selectedOption={item}
                sequence={sequence}
                dropdownActive={dropdownActive}
                setCloseDropdown={setCloseDropdown}
                sequenceArray={sequenceArray}
                setSequenceArray={setSequenceArray}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Line marginBottom={10} marginTop={10} />
        <Line marginBottom={10} marginTop={10} />
      </div>
    </Fragment>
  );
};
export default DoubleOption;