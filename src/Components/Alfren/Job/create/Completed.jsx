import React, { Fragment, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Image } from "../../../../AbstractElements";
import completedJob from "../../../../assets/used-files/images/completedJob.svg";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/jobs");
    }, 4000);

    // Clear timeout if the component unmounts before the timeout
    return () => clearTimeout(timeout);
  }, [history]);
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12" className="mt-5">
            <Image attrImage={{ src: completedJob }} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Completed;
