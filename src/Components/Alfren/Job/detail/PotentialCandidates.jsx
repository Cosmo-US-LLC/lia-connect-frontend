import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { BsThreeDots } from "react-icons/bs";
import { BiSolidCheckbox } from "react-icons/bi";


const PotentialCandidates = () => {
  return (
    <Fragment>
      <Card style={{ height: '177px' }}>
        <div style={{ borderBottom: '2px solid #299A16', borderRadius: '9px' }}>
          <div style={{ width: '40%', position: 'absolute', height: '100%', textAlign: 'center' }}>
            <p style={{
              position: "relative",
              top: "15px",
              right: "-13px",
              textAlign: 'start'
            }}>
              <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 7C9.5 7.26522 9.39464 7.51957 9.20711 7.70711C9.01957 7.89464 8.76522 8 8.5 8H2.5L0.5 10V2C0.5 1.73478 0.605357 1.48043 0.792893 1.29289C0.98043 1.10536 1.23478 1 1.5 1H8.5C8.76522 1 9.01957 1.10536 9.20711 1.29289C9.39464 1.48043 9.5 1.73478 9.5 2V7Z" fill="#9BBDFD" stroke="#1264FD" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span style={{ marginLeft: '4px', position: 'relative', bottom: '1.5px', color: '#595959' }}>Messages</span>
            </p>
            <div style={{
              position: "relative",
              width: "15%",
              borderBottom: "1px solid #1264FD",
              left: "12px",
              bottom: "4px "
            }}></div>
            <div>
              <h1 style={{ fontWeight: 'bolder', fontSize: '50px', color: '#299A16', marginTop: '22px', marginLeft: '17px' }}>137/ <strong style={{ fontSize: '26px', color: "#E4AC00", position: 'relative', right: '14px' }}>218 </strong></h1>
              <p><span><BiSolidCheckbox style={{ color: '#299A16', marginBottom: "-2px" }} /></span> Reply Received</p>
              <span style={{
                position: "relative",
                bottom: "81px",
                left: "116px",
                fontSize: "15px"
              }}><span><BiSolidCheckbox style={{ color: '#FECF41', marginBottom: "-2px" }} /></span>send</span>
            </div>
          </div>


          <CardBody style={{ padding: "20px" }} className="potential-candidate-style">
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

              <img style={{ marginRight: '50px' }} src="../../face.png" alt="no-img" /> <span style={{ fontSize: 'large', position: 'relative', bottom: "15px" }}><BsThreeDots style={{ color: '#C4C4C4' }} /></span>
              <p style={{ marginRight: '80px' }} className="mb-0">Super!</p>
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
            <div className="text-end" >
              <h4 style={{ fontWeight: 900, fontSize: "47px", color: "#299A16", textAlign: 'end', marginBottom: '0' }}>
                75%            </h4>
              <div style={{ fontSize: '10px', color: "#299A16" }} className="text-end">Reply Rate</div>
            </div>
          </CardBody>
        </div>
      </Card>
    </Fragment>
  );
};
export default PotentialCandidates;
