import React, { Fragment, useState } from "react";
import { Input } from "reactstrap";
import { H4, H6, LI, ToolTip, UL } from "../../../../../AbstractElements";

import { InputGroup, InputGroupText } from "reactstrap";
import { Check, Search } from "react-feather";

const DataTables = ({ closeSearchDropdown }) => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Marketing Manager", isChecked: true },
    { id: 2, title: "Social Media Manager ", isChecked: true },
    { id: 3, title: "Digital Strategist", isChecked: false },
    { id: 4, title: "Jr. Seo Specialist", isChecked: false },
    { id: 5, title: "Content Writer", isChecked: false },
    { id: 6, title: "Sr. Graphic Designer", isChecked: false },
    { id: 7, title: "Front-End Developers", isChecked: false },
    { id: 8, title: "Marketing Executive", isChecked: true },
    { id: 9, title: "Sr. Backend Engineer", isChecked: false },
    { id: 10, title: "Web Designer", isChecked: false },
  ]);

  const toggleLICheck = (jobId) => {
    console.log("ffff");
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
          <UL attrUL={{ className: "flex-row" }}>
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
          <div style={{ textAlign: "right" }}>
            <button className="btn  pe-4 ps-4 me-1 border-dark">
              <span>Reset</span>
            </button>
            <button
              className="btn btn-primary pe-4 ps-4 ms-1"
              onClick={closeSearchDropdown}
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DataTables;
