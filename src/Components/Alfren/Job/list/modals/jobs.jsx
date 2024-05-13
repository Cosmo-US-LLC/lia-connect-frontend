import React, { Fragment, useState } from "react";
import { Input } from "reactstrap";
import { H4, H6, LI, ToolTip, UL } from "../../../../../AbstractElements";

import { InputGroup, InputGroupText } from "reactstrap";
import { Check, Search, X } from "react-feather";

const Jobs = ({
  closeSearchDropdown,
  jobs,
  setJobs,
  setSelectedJobs,
  setIsJobSelected,
}) => {
  const toggleLICheck = (jobId) => {
    // Map through the jobs array
    const updatedJobs = jobs.map((job) => {
      // If the job id matches the jobId parameter, toggle its checked property
      if (job.id === jobId) {
        return {
          ...job,
          isChecked: !job.isChecked, // Toggle the checked property
        };
      }
      return job; // Return the job object unchanged if the id doesn't match
    });

    // Update the state with the updatedJobs array
    setJobs(updatedJobs);
    // Get the titles of the selected jobs
    const selectedJobTitles = updatedJobs
      .filter((job) => job.isChecked)
      .map((job) => job.title);

    // Set the limit for the number of words
    const wordLimit = 3;

    // Concatenate the titles up to the word limit
    let concatenatedTitles = selectedJobTitles.slice(0, wordLimit).join(", ");

    // If there are more selected jobs than the word limit, append the count of additional jobs
    if (selectedJobTitles.length > wordLimit) {
      const additionalCount = selectedJobTitles.length - wordLimit;
      concatenatedTitles += ` + ${additionalCount} more`;
    }

    // Set the concatenated titles in the state variable
    setSelectedJobsName(concatenatedTitles);
  };
  const resetJobs = () => {
    const resetJobs = jobs.map((job) => ({
      ...job,
      isChecked: false,
    }));
    setJobs(resetJobs);
    setSelectedJobsName(null);
  };
  const [selectedJobsName, setSelectedJobsName] = useState("");

  const markDone = () => {
    const selectedJobs = jobs.filter((job) => job.isChecked);
    setSelectedJobs(selectedJobs);
    closeSearchDropdown();

    const isAnyJobSelected = selectedJobs.some((job) => job.isChecked);

    // Set prioritySelected based on whether any priority is selected
    setIsJobSelected(isAnyJobSelected);
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
          width: "50%",
        }}
      >
        <InputGroup style={{ boxShadow: "0px 2px 12px 0px #00000014" }}>
          <InputGroupText
            style={{
              borderRight: "none",
              backgroundColor: "white",
              color: "#585DDB",
            }}
          >
            <Search strokeWidth={0.5} />
          </InputGroupText>
          <Input
            placeholder="All Campaigns"
            className="js-example-basic-single col-sm-3"
          />
        </InputGroup>
        <div className="mt-3">
          <UL
            attrUL={{
              className: "flex-row custom-scrollbar",
              style: { maxHeight: "300px", overflowY: "auto" },
            }}
          >
            {jobs.map((job, index) => (
              <li
                key={index}
                className="ms-4 me-4 border-bottom mb-2 d-flex align-items-center"
                style={{ borderRadius: 0 }}
                onClick={() => toggleLICheck(job.id)} // Call toggleLICheck when clicked
              >
                <span className="ps-3 flex-grow-1">{job.title}</span>
                <span className="ms-auto pe-3">
                  <Check
                    strokeWidth={1}
                    color={job.isChecked ? "#299A16" : "white"}
                  />
                </span>
              </li>
            ))}
          </UL>
          {selectedJobsName && (
            <div className="ms-4">
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  textAlign: "left",
                  backgroundColor: "#F1F1F1",
                  border: "0.54px solid #ADADAD",
                  color: "black",
                  borderRadius: "10px",
                }}
              >
                <span className="m-2">{selectedJobsName}</span>
                <span>
                  <X
                    strokeWidth={1}
                    size={10}
                    style={{ paddingTop: "2px", marginRight: "2px" }}
                  />
                </span>
              </span>
            </div>
          )}

          <div style={{ textAlign: "right" }}>
            <button
              className="btn  pe-4 ps-4 me-1 border-dark"
              onClick={resetJobs}
            >
              <span>Reset</span>
            </button>
            <button
              className="btn btn-primary pe-4 ps-4 ms-1"
              onClick={markDone}
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Jobs;
