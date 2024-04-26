import React, { Fragment } from "react";
import { Eye, GitMerge, GitPullRequest, MessageSquare } from "react-feather";
import { Sequence } from "./sequence";
import { Col, Row } from "reactstrap";

// Recursive component to render nested sequences
export const SequenceChildren = ({ sequence }) => {
  return (
    <Fragment>
      <Row>
        <Col xl="12">
          <div
            className="btn d-inline-flex mt-5"
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
      </Row>
    </Fragment>
  );
};
