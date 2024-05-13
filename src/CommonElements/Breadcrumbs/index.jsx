import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import { Image } from "../../AbstractElements";
import { Home, MessageCircle, Search, Settings, User } from "react-feather";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ breadcrumbActive }) => {
  return (
    <Fragment>
      <Container fluid={true}>
        <div className="page-title mt-3">
          <Row>
            <Col xs="12">
              <ol className="breadcrumb">
                <li className="me-2 pt-1">
                  {(() => {
                    switch (breadcrumbActive.icon) {
                      case "Home":
                        return <Home strokeWidth={1} size={20} />;
                      case "Candidate":
                        return <User strokeWidth={1} size={20} />;
                      case "Job":
                        return <Search strokeWidth={1} size={20} />;
                      case "Setting":
                        return <Settings strokeWidth={1} size={20} />;
                      case "Messages":
                        return <MessageCircle strokeWidth={1} size={20} />;
                      default:
                        return null;
                    }
                  })()}
                </li>

                {breadcrumbActive.parent ? (
                  <li className="d-flex breadcrumb-item">
                    <Link
                      to={breadcrumbActive.parent.path}
                      style={{ color: "#595959" }}
                    >
                      {breadcrumbActive.parent.label}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {breadcrumbActive.subParent ? (
                  <li className=" d-flex  breadcrumb-item">
                    {breadcrumbActive.subParent.label}
                  </li>
                ) : (
                  ""
                )}
                <li className=" d-flex breadcrumb-item active">
                  {breadcrumbActive.label}
                </li>
              </ol>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Breadcrumbs;
