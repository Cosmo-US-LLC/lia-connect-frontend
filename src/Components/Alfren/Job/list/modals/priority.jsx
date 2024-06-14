import React, { Fragment, useEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import { H4, H6, LI, ToolTip, UL } from "../../../../../AbstractElements";

import { InputGroup, InputGroupText } from "reactstrap";
import { Check, Flag, Search, X } from "react-feather";

const Priority = ({ priorities, setPriorities, setIsPrioritySelected }) => {
  const toggleLICheck = (priorityId) => {
    // Map through the jobs array
    const updatedPriorities = priorities.map((priority) => {
      // If the job id matches the jobId parameter, toggle its checked property
      if (priority.id === priorityId) {
        return {
          ...priority,
          isChecked: !priority.isChecked, // Toggle the checked property
        };
      }
      return priority; // Return the job object unchanged if the id doesn't match
    });

    // Update the state with the updatedJobs array
    setPriorities(updatedPriorities);
    // Check if any priority is selected (isChecked === true)
    const isAnyPrioritySelected = updatedPriorities.some(
      (priority) => priority.isChecked
    );

    // Set prioritySelected based on whether any priority is selected
    setIsPrioritySelected(isAnyPrioritySelected);
  };

  return (
    <Fragment>
      <div
        style={{
          padding: "10px",
          position: "absolute",
          boxShadow: "0px 10px 26px 0px #0000001A",
          zIndex: 2,
          backgroundColor: "white",
          borderRadius: "8px",
          width: "20%",
          left: "180px",
        }}
      >
        <div>
          <UL
            attrUL={{
              className: "flex-row",
              style: { maxHeight: "300px", overflowY: "auto",cursor:'pointer'},
            }}
          >
            {priorities.map((item, index) => (
              <li
                key={index}
                className=" border-bottom mb-2 d-flex align-items-center"
                style={{ borderRadius: 0 }}
                onClick={() => toggleLICheck(item.id)} // Call toggleLICheck when clicked
              >
                <Flag
                  fill={item.fill}
                  color={item.color}
                  size={14}
                  strokeWidth={1.5}
                />
                <span style={{marginLeft:'10px'}}>{item.title}</span>
                <span className="ms-auto pe-3">
                  <Check
                    strokeWidth={1}
                    color={item.isChecked ? "#299A16" : "white"}
                  />
                </span>
              </li>
            ))}
          </UL>
        </div>
      </div>
    </Fragment>
  );
};

export default Priority;
