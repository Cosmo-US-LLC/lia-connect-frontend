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
import { Col, Row } from "reactstrap";
import { memo, useCallback, useState } from "react";
import { Line } from "./components/line";
import { SingleOption } from "./singleOption";
import { DoubleOption } from "./doubleOption";

// Recursive component to render nested sequences
export const NestedSequence = ({
  sequence,
  sequenceArray,
  setSequenceArray,
}) => {
  return (
    <Fragment>
      <Row>
        <Col xl="12">
          <div
            className="btn d-inline-flex"
            style={{ backgroundColor: "#1264FD", color: "white" }}
          >
            <span className="d-flex flex-row align-items-center">
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
                    key={index}
                  >
                    {sequence.children.map((child, childrenIndex) =>
                      child.parentOptionId === item.id ? (
                        <NestedSequence
                          sequence={child}
                          sequenceArray={sequenceArray}
                          setSequenceArray={setSequenceArray}
                        />
                      ) : (
                        <Sequence
                          key={childrenIndex} // Ensure each child has a unique key
                          id={sequence.sequenceId}
                          optionId={item.id}
                          name={sequence.actionName}
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
                      <Col xl={sequence.children.length === 1 ? "12" : "6"}>
                        <NestedSequence
                          sequence={item}
                          sequenceArray={sequenceArray}
                          setSequenceArray={setSequenceArray}
                        />
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    {sequence.options.map((item, index) => (
                      <Col xl={sequence.options.length === 1 ? "12" : "6"}>
                        <Sequence
                          key={index}
                          id={sequence.sequenceId}
                          optionId={item.id}
                          name={sequence.actionName}
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
