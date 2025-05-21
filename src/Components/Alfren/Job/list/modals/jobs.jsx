import React, { Fragment, useState } from "react";
import { Input } from "reactstrap";
import { Check, Search, X } from "react-feather";
import { InputGroup, InputGroupText } from "reactstrap";
import { UL } from "AbstractElements";
import { useDebouncedCallback } from "use-debounce";

const Jobs = ({
  closeSearchDropdown,
  jobs,
  setJobs,
  setSelectedJobs,
  setIsJobSelected,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobsName, setSelectedJobsName] = useState("");
const handleSearchDebounced = useDebouncedCallback((value) => {
  setSearchQuery(value); // Keep case consistent here, do .toLowerCase() in filter only
}, 200);

// Render filtered jobs dynamically:
const filteredJobs = React.useMemo(() => {
  return jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [jobs, searchQuery]);

  const toggleLICheck = (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, isChecked: !job.isChecked } : job
    );
    setJobs(updatedJobs);
    updateSelectedJobsName(updatedJobs);
  };

  const resetJobs = () => {
    const resetJobs = jobs.map((job) => ({ ...job, isChecked: false }));
    setJobs(resetJobs);
    updateSelectedJobsName(resetJobs);
  };

  const updateSelectedJobsName = (updatedJobs) => {
    const selectedJobTitles = updatedJobs
      .filter((job) => job.isChecked)
      .map((job) => job.title);

    const wordLimit = 3;
    let concatenatedTitles = selectedJobTitles
      ? selectedJobTitles.slice(0, wordLimit).join(", ")
      : "";

    if (selectedJobTitles && selectedJobTitles.length > wordLimit) {
      const additionalCount = selectedJobTitles.length - wordLimit;
      concatenatedTitles += ` + ${additionalCount} more`;
    }

    setSelectedJobsName(concatenatedTitles);
  };

  const markDone = () => {
    const selectedJobs = jobs.filter((job) => job.isChecked);
    setSelectedJobs(selectedJobs);
    closeSearchDropdown();
    setIsJobSelected(selectedJobs.length > 0);
  };

const handleInputChange = (e) => {
  const { value } = e.target;
  handleSearchDebounced(value);
  setSearchQuery("");
};

  return (
    <Fragment>
      <div
        style={{
          padding: "10px",
          position: "absolute",
          boxShadow: "0px 10px 26px 0px #0000001A",
          zIndex: 20,
          backgroundColor: "white",
          borderRadius: "8px",
          width: "50%",
          maxHeight: "400px",
          overflow: "auto",
        }}
      >
        <InputGroup>
          <Input
            style={{
              width: "100%",
              border: "1px solid #E0E0E0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              padding: "6px 12px",
              borderRadius: "6px",
              marginTop: "10px",
            }}
            placeholder="Search Jobs"
            className="js-example-basic-single col-sm-3"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </InputGroup>
        <div className="mt-3">
          <UL
            className="flex-row"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              listStyleType: "none",
              paddingLeft: 0,
            }}
          >
            {
              filteredJobs.map((job) => (
                <li
                  key={job.id}
                  className=" border-bottom  d-flex align-items-center"
                  style={{
                    borderRadius: 0,
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "transform 0.1s ease",
                    backgroundColor: job.isChecked ? "#EAF6FF" : "white",
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                  onMouseEnter={(e) => {
                    if (!job.isChecked)
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = job.isChecked
                      ? "#EAF6FF"
                      : "white";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => toggleLICheck(job.id)}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "scale(0.97)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <input
                    type="checkbox"
                    checked={job.isChecked}
                    onChange={() => toggleLICheck(job.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: "16px",
                      height: "16px",
                      accentColor: "#299A16",
                      marginRight: "12px",
                      cursor: "pointer",
                    }}
                  />

                  <span className="flex-grow-1">{job.title}</span>
                </li>
              ))}
          </UL>
          {selectedJobsName && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#F5F9FF",

                padding: "8px 12px",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              <span>{selectedJobsName}</span>
              <X
                onClick={resetJobs}
                style={{
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
                size={12}
              />
            </div>
          )}

          <div
            style={{
              textAlign: "right",
              paddingTop: "20px",
              paddingBottom: "10px",
            }}
          >
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
