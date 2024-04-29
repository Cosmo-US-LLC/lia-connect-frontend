import { useState } from "react";
import { useDrop } from "react-dnd";
import { Btn, Image } from "../../../../../AbstractElements";
import startSequence from "../../../../../assets/used-files/images/startSequence.png";
import { id } from "date-fns/locale";
import {
  Eye,
  GitCommit,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  Plus,
} from "react-feather";
import { BorderRadius } from "../../../../../Constant";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { Actions } from "./actions";

export const ItemTypes = {
  BOX: "box",
};
function getStyle() {
  return {
    border: "1px dashed  #DADADA",
    boxShadow: "0px 6px 20px 0px #0000000F",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
  };
}
export const Sequence = ({
  id,
  name,
  optionId,
  addSequenceRecord,
  activeSequence,
}) => {
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(_item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        return { id, name, optionId };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild]
  );
  const [dropdownActive, setDropdownActive] = useState(false);
  const actionDetails = {
    1: {
      options: [
        {
          id: 1,
          name: "Default",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
      ],
      name: "View Profile",
      input: null,
    },
    2: {
      options: [
        {
          id: 1,
          name: "Still not Accepted",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
        {
          id: 2,
          name: "Accepted",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
      ],
      name: "Send Request",
      input: null,
    },
    3: {
      options: [
        {
          id: 1,
          name: "Default",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
      ],
      name: "Withdraw Connection Request",
      input: null,
    },
    4: {
      options: [
        {
          id: 1,
          name: "Candidate Not Replied",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
        {
          id: 2,
          name: "Candidate Replied",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
      ],
      name: "Send Message",
      input: null,
    },
  };

  const addAction = (index) => {
    const item = actionDetails[index];

    addSequenceRecord({
      sequenceId: id ? id + optionId + 1 : 1,
      actionId: index,
      actionName: item.name,
      options: item.options,
      parentSequenceId: id ? id : 0,
      parentOptionId: optionId ? optionId : 1,
    });
  };

  return (
    <div style={{ height: "60vh" }}>
      <div
        id={"alfrenactionalfren" + id + optionId}
        ref={drop}
        style={getStyle()}
        onClick={() => setDropdownActive(!dropdownActive)}
      >
        <span style={{ marginTop: "8px", marginLeft: "4px" }}>
          <Plus strokeWidth={1} color={"#787878"} />
        </span>
        <span style={{ color: "#595959", padding: "10px" }}> Add Action </span>
        <span
          style={{
            color: "#787878",
            backgroundColor: "#EAE8E8",
            padding: "10px",
          }}
        >
          End
        </span>
      </div>
      <UncontrolledTooltip
        isOpen={dropdownActive}
        target={"alfrenactionalfren" + id + optionId}
        placement="bottom"
        style={{
          backgroundColor: "white",
          boxShadow: "0px 6px 26px -3.89px #0000001A",
        }}
        activeSequence={activeSequence}
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
            <button
              className="pt-2 pb-2 ps-2 pe-3 d-flex mb-2"
              style={{
                border: "1px solid #1264fd",
                backgroundColor: "#1264fd",
                borderRadius: "8px",
                width: "100%",
                justifyContent: "center",
              }}
              onClick={() => addAction(1)}
            >
              <div className="text-white me-2">
                <Eye strokeWidth={1} size={16} />
              </div>
              <div className="text-white">
                <span>{"View Profile"}</span>
              </div>
            </button>
            <button
              className="pt-2 pb-2 ps-2 pe-3 d-flex mb-2"
              style={{
                border: "1px solid #1264fd",
                backgroundColor: "#1264fd",
                borderRadius: "8px",
                width: "100%",
                justifyContent: "center",
              }}
              onClick={() => addAction(2)}
            >
              <div className="text-white me-2">
                <GitCommit strokeWidth={1} size={16} />
              </div>
              <div className="text-white">
                <span>{"Send Connection"}</span>
              </div>
            </button>
            <button
              className="pt-2 pb-2 ps-2 pe-3 d-flex mb-2"
              style={{
                border: "1px solid #1264fd",
                backgroundColor: "#1264fd",
                borderRadius: "8px",
                width: "100%",
                justifyContent: "center",
              }}
              onClick={() => addAction(3)}
            >
              <div className="text-white me-2">
                <GitPullRequest strokeWidth={1} size={16} />
              </div>
              <div className="text-white">
                <span>{"Withdraw Connection"}</span>
              </div>
            </button>
            <button
              className="pt-2 pb-2 ps-2 pe-3 d-flex mb-2"
              style={{
                border: "1px solid #1264fd",
                backgroundColor: "#1264fd",
                borderRadius: "8px",
                width: "100%",
                justifyContent: "center",
              }}
              onClick={() => addAction(4)}
            >
              <div className="text-white me-2">
                <GitPullRequest strokeWidth={1} size={16} />
              </div>
              <div className="text-white">
                <span>{"Send Message"}</span>
              </div>
            </button>
          </div>
        </div>
      </UncontrolledTooltip>
    </div>
  );
};
