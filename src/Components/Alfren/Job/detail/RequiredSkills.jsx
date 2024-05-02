import React, { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
import { X } from "react-feather";
const RequiredSkills = () => {
  const [selectedSkills, setSelectedSkills] = useState([
    { id: 1, title: "UX/UI Designer" },
    { id: 2, title: "UX Research" },
    { id: 3, title: "Adobe XD" },
    { id: 4, title: "Adobe Photoshop" },
    { id: 5, title: "Information Architecture" },
    { id: 6, title: "Design Thinking" },
    { id: 7, title: "Figma" },
  ]);
  const removeSkill = (jobId) => {
    const updatedJobs = selectedSkills.filter((job) => job.id !== jobId);
    // Update the state with the updatedJobs array
    setSelectedSkills(updatedJobs);
  };
  return (
    <Fragment>
      <Card style={{ height: "100%" }}>
        <CardBody style={{ padding: "20px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 400,
              position: "relative",
              width: "100%",
              color: "#595959",
            }}
          >
            Required Skills
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "8%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
          </p>
          <div className="mt-4">
            {selectedSkills.map((job, index) => (
              <button
                key={index}
                className="mt-2"
                style={{
                  display: "inline-flex",
                  border: "none",
                  color: "#595959",
                  backgroundColor: "#F7F7F7",
                  borderRadius: "4px",
                  padding: "6px",
                  marginRight: "8px",
                }}
              >
                <span className="ms-2 me-2" style={{ fontSize: "12px" }}>
                  {job.title}
                </span>
                <X
                  strokeWidth={1.5}
                  size={16}
                  onClick={() => removeSkill(job.id)}
                />
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default RequiredSkills;
