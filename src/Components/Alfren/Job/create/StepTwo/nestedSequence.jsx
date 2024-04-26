import React from "react";
import { Eye, GitMerge, GitPullRequest, MessageSquare } from "react-feather";
import { Sequence } from "./sequence";

// Recursive component to render nested sequences
export const NestedSequence = ({ sequence }) => {
  return (
    <ul>
      {sequence.map((item, index) => (
        <li key={index}>
          <div
            className="btn d-flex flex-row align-items-center mt-5"
            style={{ backgroundColor: "#1264FD", color: "white" }}
          >
            <span className="d-flex flex-row align-items-center">
              {item.actionId == 1 ? (
                <Eye strokeWidth={1} />
              ) : item.actionId == 2 ? (
                <GitMerge strokeWidth={1} />
              ) : item.actionId == 3 ? (
                <GitPullRequest strokeWidth={1} />
              ) : item.actionId == 4 ? (
                <MessageSquare strokeWidth={1} />
              ) : null}
            </span>
            <span className="ms-2">{item.actionName}</span>
          </div>
          {item.children.length ? (
            <>
              <NestedSequence sequence={item.children} />
            </>
          ) : (
            <Sequence firstNode={false} options={item.options} />
          )}
        </li>
      ))}
    </ul>
  );
};
