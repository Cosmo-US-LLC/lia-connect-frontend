import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { BsThreeDots } from "react-icons/bs";
import { BiSolidCheckbox } from "react-icons/bi";
import { GitMerge } from "react-feather";


const BlackList = ({ Connection }) => {
  return (
    <Fragment>
      <Card style={{ height: '177px' }}>
        <div style={{ borderBottom: '2px solid #1264FD', borderRadius: '9px', height: '100%' }}>
          <div style={{ position: 'absolute', height: '100%', textAlign: 'center' }}>
            <p style={{
              position: "relative",
              top: "15px",
              right: "-13px",
              textAlign: 'start'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1264FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-git-merge">
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M6 21V9a9 9 0 0 0 9 9"></path>
              </svg>
              <span style={{ marginLeft: '4px', position: 'relative', bottom: '1.5px', color: '#595959' }}>Connection Status</span>
            </p>
            <div style={{
              position: "relative",
              width: "13%",
              borderBottom: "1px solid #1264FD",
              left: "12px",
              bottom: "4px "
            }}></div>
            <div style={{ minWidth: '370px', marginBottom: '35px', marginTop: '26px' }}>
              <p style={{ position: "relative", right: "50px" }}>
                <span><BiSolidCheckbox style={{ color: '#FECF41', marginBottom: "-2px" }} /></span>
                Connection Request Sent
                <strong style={{ fontSize: '18px', color: '#FECF41', marginLeft: '10px' }}>{Connection?.sent}</strong>
              </p>
              <p style={{ position: "relative", right: "31px" }}>
                <span><BiSolidCheckbox style={{ color: '#299A16', marginBottom: "-2px" }} /></span>
                Connection Request Accepted
                <strong style={{ fontSize: '18px', color: '#299A16', marginLeft: '7px' }}>{Connection?.accepted}</strong>
              </p>
            </div>
          </div>

          <CardBody style={{ padding: "20px", height: '100%' }} className="blacklist-style">
            <p
              style={{
                marginBottom: '0px',
                fontSize: "12px",
                fontWeight: 400,
                position: "relative",
                width: "100%",
                color: "#595959",
                textAlign: 'end'
              }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "25%",
                  borderBottom: "1px solid #1264FD",
                }}

              ></span>
            </p>
            <div className="text-end" style={{
              marginTop: "40px",
              marginRight: "6px"
            }}>
              <h4 style={{ fontWeight: 900, fontSize: "47px", color: "#1264FD", textAlign: 'end', marginBottom: '0' }}>
                {Connection?.acceptancePercentage}%            </h4>
              <div style={{ fontSize: '14px', color: "#1264FD" }} className="text-end">Acceptance</div>
            </div>
          </CardBody>
        </div>
      </Card>
    </Fragment>
  );
};
export default BlackList;
