import React, { Fragment, useEffect } from "react";
import {
  Clock,
  Eye,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  MoreVertical,
} from "react-feather";
import { Sequence } from "./sequence";
import { Card, CardBody, Col, Row, UncontrolledTooltip } from "reactstrap";
import { memo, useCallback, useState } from "react";
import { Line } from "./components/line";
import { SingleOption } from "./singleOption";
import { DoubleOption } from "./doubleOption";
import HeaderCard from "../../../../Common/Component/HeaderCard";
import SimpleMdeReact from "react-simplemde-editor";

// Recursive component to render nested sequences
export const NestedSequence = ({
  sequence,
  sequenceArray,
  setSequenceArray,
  addSequenceRecord,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [text, setText] = useState(
    `Enter text in the area on the left. For more info, click the ? (help) icon in the menu.`
  );
  const handleChange = (e) => {};
  return (
    <Fragment>
      <Row>
        <Col xl="12">
          <div
            className="btn d-inline-flex"
            style={{
              backgroundColor: "#1264FD",
              color: "white",
            }}
          >
            <span className="d-flex flex-row align-items-center justify-content-between">
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
            <span className="ms-2">{sequence.actionName}</span>
            {sequence.actionId === 4 && (
              <div>
                <span
                  id={"alfrenmessagealfren" + sequence.id + sequence.optionId}
                  onClick={() => setDropdownActive(!dropdownActive)}
                >
                  <MoreVertical strokeWidth={1} size={16} />
                </span>
                <UncontrolledTooltip
                  isOpen={dropdownActive}
                  target={
                    "alfrenmessagealfren" + sequence.id + sequence.optionId
                  }
                  placement="bottom"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0px 6px 26px -3.89px #0000001A",
                    maxWidth: "90%",
                  }}
                >
                  <Card>
                    <HeaderCard title="dfgdf" />
                    <CardBody>
                      <SimpleMdeReact
                        id="editor_container"
                        onChange={() => handleChange}
                        value={text}
                        options={{
                          autofocus: true,
                          spellChecker: false,
                        }}
                      />
                    </CardBody>
                  </Card>
                </UncontrolledTooltip>
              </div>
            )}
          </div>
        </Col>
        <Col xl="12" className="text-center">
          {sequence.options.length === 1 ? (
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
          {sequence.options.length &&
          sequence.children.length &&
          sequence.children.length < sequence.options.length ? (
            <>
              <Row>
                {sequence.options.map((item, index) => (
                  <Col
                    xl={sequence.options.length === 1 ? "12" : "6"}
                    xm={sequence.options.length === 1 ? "12" : "6"}
                    xs={sequence.options.length === 1 ? "12" : "6"}
                    key={index}
                  >
                    {sequence.children.map((child, childrenIndex) =>
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
                    {sequence.children.map((item, index) => (
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
                    {sequence.options.map((item, index) => (
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
      </Row>
    </Fragment>
  );
};
