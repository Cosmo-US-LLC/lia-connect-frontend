import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { BsThreeDots } from "react-icons/bs";
import { BiSolidCheckbox } from "react-icons/bi";
import { GitMerge } from "react-feather";

const BlackList = ({ Connection }) => {
  return (
    <Fragment>
      <Card style={{ height: "177px" }}>
        <div
          style={{
            borderBottom: "2px solid #1264FD",
            borderRadius: "9px",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              height: "100%",
              textAlign: "center",
            }}
          >
            <p
              style={{
                position: "relative",
                top: "15px",
                right: "-13px",
                textAlign: "start",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1264FD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-git-merge"
              >
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M6 21V9a9 9 0 0 0 9 9"></path>
              </svg>
              <span
                style={{
                  marginLeft: "4px",
                  position: "relative",
                  bottom: "1.5px",
                  color: "#595959",
                }}
              >
                Connection Status
              </span>
            </p>
            <div
              style={{
                position: "relative",
                width: "13%",
                borderBottom: "1px solid #1264FD",
                left: "12px",
                bottom: "4px ",
              }}
            ></div>
            <div
              style={{
                minWidth: "370px",
                 display: "flex",
                justifyContent: "start",
                alignItems: "start",
                textAlign: "start",
                flexDirection: "column",
                paddingTop: "20px",
                paddingLeft: "26px",
              }}
            >
              <p  >
                <span>
                  <BiSolidCheckbox
                    style={{ color: "#E4AC00", marginBottom: "-2px", marginRight: "3px", }}
                  />
                </span>
                Connection Request Sent
                <strong
                  style={{
                    fontSize: "22px",
                    color: "#E4AC00",
                    marginLeft: "12px",
                  }}
                >
                  {Connection?.sent}
                </strong>
              </p>
              <p style={{ marginTop: "-10px" }} >
                <span>
                  <BiSolidCheckbox
                    style={{ color: "#299A16", marginBottom: "-3px", marginRight: "3px", }}
                  />
                </span>
                Connection Request Accepted
                <strong
                  style={{
                    fontSize: "22px",
                    color: "#299A16",
                    marginLeft: "12px",
                  }}
                >
                  {Connection?.accepted}
                </strong>
              </p>
            </div>
          </div>

          <CardBody
            style={{
              width: "100%",
              height: "100%",
              minHeight: "170px",
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
            className="blacklist-style"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "30%",
              }}
            >
              <h4
                style={{
                  fontWeight: 900,
                  fontSize: "67px",
                  color: "#1264FD",
                  marginBottom: "0",
                  textAlign: "center",
                }}
              >
                {Connection?.acceptancePercentage}%{" "}
              </h4>
              <div
                style={{
                  fontSize: "15px",
                  color: "#1264FD",
                  textAlign: "end",
                  width: "130px",
                  paddingRight: "10px",
                }}
              >
                Acceptance
              </div>
            </div>
          </CardBody>
        </div>
      </Card>
    </Fragment>
  );
};
export default BlackList;
