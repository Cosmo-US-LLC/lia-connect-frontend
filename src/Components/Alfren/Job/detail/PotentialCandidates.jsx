import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { BsThreeDots } from "react-icons/bs";
import { BiSolidCheckbox } from "react-icons/bi";


const PotentialCandidates = () => {
  return (
    <Fragment>
      <Card style={{ height: '177px' }}>
        <div style={{borderBottom:'2px solid #299A16'}}>
          <div style={{ width: '40%', position: 'absolute', height: '100%', textAlign: 'center' }}>
            <div>
              <h1 style={{ fontWeight: 'bolder', fontSize: '45px', color: '#299A16', marginTop: '55px'}}>137/ <strong style={{ fontSize: '26px', color: "#E4AC00", position: 'relative', right: '14px' }}>218 </strong></h1>
              <p><span><BiSolidCheckbox style={{ color: '#299A16', marginBottom: "-2px" }} /></span> Reply Received</p>
              <span style={{
                    position: "relative",
                    bottom: "80px",
                    left: "86px",
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

              <img style={{ marginRight: '50px' }} src="../../face.png" alt="no-img" /> <span style={{ fontSize: 'large' }}><BsThreeDots style={{ color: '#C4C4C4' }} /></span>
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
