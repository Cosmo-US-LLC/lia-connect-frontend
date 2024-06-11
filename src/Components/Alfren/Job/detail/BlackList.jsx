import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { BsThreeDots } from "react-icons/bs";
const BlackList = () => {
  return (
    <Fragment>
      <Card style={{height:'177px'}}>
        <CardBody style={{ padding: "20px" }} className="blacklist-style">
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
          <div className="text-end" >
            <h4 style={{ fontWeight: 900, fontSize: "55px", color: "#1264FD", textAlign: 'end', marginBottom: '0',marginTop:"30px",marginRight:'30px' }}>
              85%            </h4>
            <div style={{ fontSize: '10px', color: "#1264FD" ,marginRight:'32px'}} className="text-end">Acceptance</div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default BlackList;
