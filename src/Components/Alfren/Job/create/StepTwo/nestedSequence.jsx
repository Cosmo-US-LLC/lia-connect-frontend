import React, { Fragment, useEffect } from "react";
import {
  Clock,
  Eye,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  MoreVertical,
  X,
} from "react-feather";
import { Sequence } from "./sequence";
import { Card, CardBody, Col, Row, UncontrolledTooltip } from "reactstrap";
import { memo, useCallback, useState } from "react";
import { Line } from "./components/line";
import { SingleOption } from "./singleOption";
import { SettingDropdown } from "./components/settingDropdown";
import DoubleOption from "./doubleOption";

// Recursive component to render nested sequences
 const NestedSequence = ({
  sequence,
  sequenceArray,
  setSequenceArray,
  addSequenceRecord,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  console.log('dropdownActive11111111111111111', dropdownActive)
  const [configureDropDownActive, setConfigureDropDownActive] = useState(false);

  const deleteSequence = (item) => {
    const newArray = sequenceArray.filter(
      (obj) =>
        obj.sequenceId !== item.sequenceId &&
        obj.parentSequenceId !== item.sequenceId
    );

    setSequenceArray(newArray);
  };
  return (
    <Fragment>
      <Row>
        {sequence.actionId !== 5 ? (
          <>
            {" "}
            <Col xl="12">
              <div
                style={{
                  boxShadow: "0px 6px 20px 0px #0000000F",
                  borderRadius: "4px",
                  color: "white",
                  backgroundColor: "#1264FD",
                  textAlign: "center",
                  display: "inline-flex",
                  alignItems: "center",
                }}
                id={"alfrenmessagealfren" + sequence.sequenceId}
              >
                <span
                  style={{
                    padding: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                  onClick={() => setConfigureDropDownActive(false)}
                >
                  {(() => {
                    switch (sequence.actionId) {
                      case 1:
                        return <Eye strokeWidth={1} />;
                      case 2:
                        return <GitMerge strokeWidth={1} />;
                      case 3:
                        return <GitPullRequest strokeWidth={1} />;
                      case 4:
                        return <MessageSquare strokeWidth={1} />;
                      default:
                        return null;
                    }
                  })()}
                </span>
                <span
                  style={{ color: "white", padding: "10px" }}
                  onClick={() => setConfigureDropDownActive(false)}
                >
                  {sequence.actionName}
                </span>

                {sequence.actionId == 1 || sequence.actionId == 3 ? (
                  <>
                    {" "}
                    <button
                      className="d-flex"
                      style={{
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: "transparent",
                        fontWeight: "600",
                        color: "white",
                      }}
                      onClick={() => deleteSequence(sequence)}
                    >
                      <X size={18} strokeWidth={1} />
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      id={"alfrenSettingalfren" + sequence.sequenceId}
                      className="d-flex"
                      style={{
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: "transparent",
                        fontWeight: "600",
                        color: "white",
                      }}
                      onClick={() => setDropdownActive(!dropdownActive)}
                    >
                      <MoreVertical size={15} strokeWidth={3} />
                      <SettingDropdown
                      setDropdownActive={setDropdownActive}
                        target={"alfrenSettingalfren" + sequence.sequenceId}
                        sequence={sequence}
                        dropdownActive={dropdownActive}
                        setSequenceArray={setSequenceArray}
                        configureDropDownActive={configureDropDownActive}
                        setConfigureDropDownActive={setConfigureDropDownActive}
                        deleteSequence={deleteSequence}
                      />
                    </button>
                  </>
                )}
              </div>
            </Col>
            <Col xl="12" className="text-center">
              {sequence?.options?.length === 1 ? (
                <SingleOption
                  sequence={sequence}
                  sequenceArray={sequenceArray}
                  setSequenceArray={setSequenceArray}
                />
              ) : (
                <DoubleOption
                  sequence={sequence}
                  sequenceArray={sequenceArray}
                  setSequenceArray={setSequenceArray}
                />
              )}
            </Col>
            <Col xl="12">
              {sequence?.options?.length &&
              sequence?.children?.length &&
              sequence?.children?.length < sequence?.options?.length ? (
                <>
                  <Row>
                    {sequence.options?.map((item, index) => (
                      <Col
                        xl={sequence.options.length === 1 ? "12" : "6"}
                        xm={sequence.options.length === 1 ? "12" : "6"}
                        xs={sequence.options.length === 1 ? "12" : "6"}
                        key={index}
                      >
                        {sequence?.children?.map((child, childrenIndex) =>
                          child.parentOptionId === item.id ? (
                            <NestedSequence
                              sequence={child}
                              sequenceArray={sequenceArray}
                              setSequenceArray={setSequenceArray}
                              addSequenceRecord={addSequenceRecord}
                            />
                          ) : (
                            <Sequence
                              key={childrenIndex} // Ensure each child has a unique key
                              id={sequence.sequenceId}
                              optionId={item.id}
                              name={sequence.actionName}
                              addSequenceRecord={addSequenceRecord}
                            />
                          )
                        )}
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                <>
                  {sequence.children.length ? (
                    <>
                      <Row>
                        {sequence?.children?.map((item, index) => (
                          <Col
                            xl={sequence.children.length === 1 ? "12" : "6"}
                            xm={sequence.options.length === 1 ? "12" : "6"}
                            xs={sequence.options.length === 1 ? "12" : "6"}
                          >
                            <NestedSequence
                              sequence={item}
                              sequenceArray={sequenceArray}
                              setSequenceArray={setSequenceArray}
                              addSequenceRecord={addSequenceRecord}
                            />
                          </Col>
                        ))}
                      </Row>
                    </>
                  ) : (
                    <>
                      <Row>
                        {sequence?.options?.map((item, index) => (
                          <Col
                            xl={sequence.options.length === 1 ? "12" : "6"}
                            xm={sequence.options.length === 1 ? "12" : "6"}
                            xs={sequence.options.length === 1 ? "12" : "6"}
                          >
                            <Sequence
                              key={index}
                              id={sequence.sequenceId}
                              optionId={item.id}
                              name={sequence.actionName}
                              addSequenceRecord={addSequenceRecord}
                            />
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
                </>
              )}
            </Col>
          </>
        ) : (
          <>
            {" "}
            <Col xl="12">
              <div
                style={{
                  boxShadow: "0px 6px 20px 0px #0000000F",
                  borderRadius: "4px",
                  color: "white",
                  backgroundColor: "#AA1313",
                  textAlign: "center",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "white", padding: "10px" }}>
                  {sequence.actionName}
                </span>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Fragment>
  );
};
export default React.memo(NestedSequence);