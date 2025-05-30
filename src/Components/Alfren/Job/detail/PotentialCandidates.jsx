import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { BiSolidCheckbox } from "react-icons/bi";

const PotentialCandidates = ({ Message }) => {
  return (
    <Fragment>
      <Card style={{ height: "177px" }}>
        <div style={{ borderBottom: "2px solid #299A16", borderRadius: "9px" }}>
          <div
            style={{
              width: "40%",
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
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 7C9.5 7.26522 9.39464 7.51957 9.20711 7.70711C9.01957 7.89464 8.76522 8 8.5 8H2.5L0.5 10V2C0.5 1.73478 0.605357 1.48043 0.792893 1.29289C0.98043 1.10536 1.23478 1 1.5 1H8.5C8.76522 1 9.01957 1.10536 9.20711 1.29289C9.39464 1.48043 9.5 1.73478 9.5 2V7Z"
                  fill="#9BBDFD"
                  stroke="#1264FD"
                  stroke-width="0.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span
                style={{
                  marginLeft: "4px",
                  position: "relative",
                  bottom: "1.5px",
                  color: "#595959",
                }}
              >
                Messages
              </span>
            </p>
            <div
              style={{
                minWidth: "370px",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                textAlign: "start",
                flexDirection: "column",
                paddingTop: "20px",
                paddingLeft: "30px",
              }}
            >
              <p>
                <span>
                  <BiSolidCheckbox
                    style={{
                      color: "#E4AC00",
                      marginBottom: "-2px",
                      marginRight: "3px",
                    }}
                  />
                </span>
                Send
                <strong
                  style={{
                    fontSize: "22px",
                    color: "#E4AC00",
                    marginLeft: "12px",
                  }}
                >
                  {Message?.sent}
                </strong>
              </p>
              <p style={{ marginTop: "-10px" }}>
                <span>
                  <BiSolidCheckbox
                    style={{
                      color: "#299A16",
                      marginBottom: "-3px",
                      marginRight: "3px",
                    }}
                  />
                </span>
                Reply Received
                <strong
                  style={{
                    fontSize: "22px",
                    color: "#299A16",
                    marginLeft: "12px",
                  }}
                >
                  {Message?.accepted}
                </strong>
              </p>
            </div>
          </div>
          <CardBody
            style={{
              padding: "20px",
              minHeight: "177px",
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
            className="potential-candidate-style"
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
                  color: "#299A16",
                  marginBottom: "0",
                  textAlign: "center",
                }}
              >
                {Message?.acceptancePercentage || 0}%{" "}
              </h4>
              <div
                style={{
                  fontSize: "15px",
                  color: "#299A16",
                  textAlign: "end",
                  width: "130px",
                }}
              >
                Reply Rate
              </div>
            </div>
          </CardBody>
        </div>
      </Card>
    </Fragment>
  );
};
export default PotentialCandidates;
