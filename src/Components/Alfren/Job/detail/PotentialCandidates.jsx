import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { BsThreeDots } from "react-icons/bs";
const PotentialCandidates = () => {
  return (
    <Fragment>
      <Card style={{height:'177px'}}>
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
            
            <img style={{ marginRight: '50px' }} src="../../face.png" alt="no-img" /> <span style={{fontSize:'large'}}><BsThreeDots style={{color:'#C4C4C4'}}/></span>
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
      </Card>
    </Fragment>
  );
};
export default PotentialCandidates;
