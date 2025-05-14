import React, { useEffect, useState, useRef } from "react";
import { INSTANCE } from "Config/axiosInstance";

const SkillsAutocomplete = ({
  skills,
  setSkills,
  skillInputValue,
  setSkillInputValue,
  register,
  error,
  jobTitle,
  clearErrors,
}) => {
  const [skillData, setSkillData] = useState({});
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchSkillSet = async () => {
      try {
        const response = await INSTANCE.post("/jobs/skillset", {});
        const skillMap = response.data.reduce((acc, item) => {
          acc[item.jobTitle] = item.skills;
          return acc;
        }, {});
        setSkillData(skillMap);
      } catch (error) {
        console.error("Error fetching skill sets:", error);
      }
    };
    fetchSkillSet();
  }, []);

  useEffect(() => {
    // Auto-fill skills if a matching job title is selected
    if (jobTitle && skillData[jobTitle]) {
      setSkills(skillData[jobTitle]);
      setSkillInputValue(""); // Clear the input field
    }
  }, [jobTitle, skillData, setSkills, setSkillInputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSkillInputValue(value);
    clearErrors("skillInputValue");

    if (value.trim()) {
      const allSkills = Object.values(skillData).flat();
      const filtered = allSkills
        .filter((skill) => !skills.includes(skill)) // Exclude already added skills
        .filter((skill) =>
          skill.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredSkills(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSkills([]);
      setShowDropdown(false);
    }
  };

  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkillInputValue("");
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && skillInputValue.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInputValue.trim())) {
        setSkills([...skills, skillInputValue.trim()]);
        setSkillInputValue("");
        clearErrors("skillInputValue");
      }
    }
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <input
        name="skillInputValue"
        type="text"
        value={skillInputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type skill name here..."
        {...register("skillInputValue", {
          onChange: handleInputChange,
        })}
        className={`form-control shadow-none ${error ? "is-invalid" : ""}`}
        style={{
          border: error
            ? ".1px solid #f2abab"
            : skillInputValue
            ? "1px solid #efefef"
            : "1px solid #efefef",
          background: "#EBF1FC",
          marginBottom: "8px",
        }}
      />
      {showDropdown && filteredSkills.length > 0 && (
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
          {filteredSkills.map((skill, index) => (
            <li
              key={index}
              onClick={() => handleSkillSelect(skill)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #f2f2f2",
              }}
              onMouseDown={(e) => e.preventDefault()} // Prevents input blur on click
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillsAutocomplete;
