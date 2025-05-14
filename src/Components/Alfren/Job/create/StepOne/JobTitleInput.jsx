import React, { useEffect, useState, useRef } from "react";
import { INSTANCE } from "Config/axiosInstance";

const JobTitleAutocomplete = ({
  value,
  onChange,
  error = false,
  register,
  clearErrors,
}) => {
  const [jobTitles, setJobTitles] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const response = await INSTANCE.post("/jobs/skillset", {});
        const titles = response.data.map((item) => item.jobTitle);
        setJobTitles(titles);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };
    fetchJobTitles();
  }, []);

  useEffect(() => {
    // Sync the local input value with the registered form value
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    clearErrors("jobName"); // Clear any previous errors

    if (newValue.trim()) {
      const filtered = jobTitles.filter((title) =>
        title.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredJobs(filtered);
      setShowDropdown(true);
    } else {
      setFilteredJobs([]);
      setShowDropdown(false);
    }
  };

  const handleJobSelect = (jobTitle) => {
    setInputValue(jobTitle);
    onChange(jobTitle);
    clearErrors("jobName");
    setShowDropdown(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="position-relative" ref={dropdownRef}>
      <input
        name="jobName"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Sr. UI/UX Designers"
        className={`form-control shadow-none ${error ? "is-invalid" : ""}`}
        style={{
          border: error
            ? ".1px solid #f2abab"
            : inputValue
            ? "1px solid #efefef"
            : "1px solid #efefef",
        }}
        {...register("jobName", {
          onChange: handleInputChange,
        })}
      />
      {showDropdown && filteredJobs.length > 0 && (
        <ul
          className="autocomplete-dropdown"
          style={{
            position: "absolute",
            zIndex: 999,
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            borderRadius: "4px",
            marginTop: "5px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {filteredJobs.map((title, index) => (
            <li
              key={index}
              onClick={() => handleJobSelect(title)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #f2f2f2",
              }}
              onMouseDown={(e) => e.preventDefault()} // Prevents input blur on click
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobTitleAutocomplete;
