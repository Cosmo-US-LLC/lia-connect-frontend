import React, { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
const BlackList = () => {
  return (
    <Fragment>
      <Card>
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
            Blacklisted Candidate
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "15%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
          </p>
          <div style={{ textAlign: "center" }} className="mt-4">
            <p style={{ fontWeight: 400, fontSize: "12px", color: "#8D8E90" }}>
              Blacklisted
            </p>
            <h4 style={{ fontWeight: 900, fontSize: "38px", color: "#1264FD" }}>
              10
            </h4>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default BlackList;
