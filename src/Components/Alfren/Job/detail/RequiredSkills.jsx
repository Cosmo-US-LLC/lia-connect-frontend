import React, { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";

const RequiredSkills = ({ jobDetails }) => {
  const [selectedSkills, setSelectedSkills] = useState(jobDetails.skills);

  return (
    <Fragment>
      {/* <Card style={{ height: "85%", position: "relative", bottom: "30px" }}> */}
      <Card style={{ paddingTop: "0px", height: "auto" }}>
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
            {selectedSkills.map((skill, index) => (
              <button
                key={index}
                className="mt-2"
                style={{
                  display: "inline-flex",
                  border: "none",
                  color: "#595959",
                  backgroundColor: "#F7F7F7",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  marginRight: "8px",
                }}
              >
                <span style={{ fontSize: "12px" }}>{skill}</span>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default RequiredSkills;
