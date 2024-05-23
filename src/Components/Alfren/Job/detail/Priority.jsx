import React, { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
import { ChevronDown, ChevronsDown, Flag } from "react-feather";
const Priority = ({jobDetails}) => {
  return (
    <Fragment>
      <Card style={{ backgroundColor: jobDetails.jobPriority == "HIGH"
                  ? "#de3e3e29"
                  : jobDetails.jobPriority == "LOW"
                  ? "white"
                  : "#FFFCF1" }}>
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
            Priority
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "10%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
            <span
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "10%",
              }}
            >
              <ChevronDown strokeWidth={1} color="#8FA8D7" />
            </span>
          </p>
          <div style={{ textAlign: "center" }} className="mt-3">
            <p style={{ fontWeight: 400, fontSize: "12px", color: "#8D8E90" }}>
              <Flag color={
                jobDetails.jobPriority == "HIGH"
                  ? "#AA1313"
                  : jobDetails.jobPriority == "LOW"
                  ? "#ABABAB"
                  : "#E2B323"
              } fill={ jobDetails.jobPriority == "HIGH"
                  ? "#DE3E3E"
                  : jobDetails.jobPriority == "LOW"
                  ? "#CECECE"
                  : "#FECF41"} />
            </p>
            <h4 style={{ fontWeight: 900, fontSize: "38px", color: jobDetails.jobPriority == "HIGH"
                  ? "#DE3E3E"
                  : jobDetails.jobPriority == "LOW"
                  ? "#CECECE"
                  : "#FECF41" }}>
              {jobDetails.jobPriority}
            </h4>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default Priority;
