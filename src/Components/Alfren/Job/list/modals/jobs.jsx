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
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Debounce the handleSearch function
  const handleSearchDebounced = useDebouncedCallback((value) => {
    const query = value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  }, 200); // Adjust the delay as needed (in milliseconds)

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
          maxHeight:'400px',
          overflow:'auto'
        }}
      >
        <InputGroup>
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
          style={{width:'27.3%',position:'fixed',boxShadow:'rgba(0, 0, 0, 0.08) 0px 2px 12px 0px'}}
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
            {filteredJobs.map((job, index) => (
              <li
                key={index}
                className="ms-4 me-4 border-bottom mb-2 d-flex align-items-center"
                style={{ borderRadius: 0, cursor: "pointer" }}
                onClick={() => toggleLICheck(job.id)}
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
