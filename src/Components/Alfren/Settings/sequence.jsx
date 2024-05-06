import React, { Fragment } from "react";
import { Container } from "reactstrap";

const Sequence = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        {" "}
        <div style={{ width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: "26px", fontWeight: 600 }} className="pt-5">
            Campaign Sequence
          </p>
          <p style={{ fontSize: "12px", fontWeight: 400 }} className="pb-3">
            Maximum number of LinkedIn actions per day{" "}
          </p>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sequence;
