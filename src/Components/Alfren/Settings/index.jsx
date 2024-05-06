import React, { Fragment, useState } from "react";
import { User } from "react-feather";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import profileActive from "../../../assets/used-files/icons/settings/profileActive.svg";
import profileInactive from "../../../assets/used-files/icons/settings/profileInactive.svg";
import sequenceActive from "../../../assets/used-files/icons/settings/sequenceActive.svg";
import sequenceInactive from "../../../assets/used-files/icons/settings/sequenceInactive.svg";
import subscriptionActive from "../../../assets/used-files/icons/settings/subscriptionActive.svg";
import subscriptionInactive from "../../../assets/used-files/icons/settings/subscriptionInactive.svg";
import { Image } from "../../../AbstractElements";
import Profile from "./profile";
import Sequence from "./sequence";
import Subscription from "./subscription/index";

const Settings = () => {
  const [menu, setMenu] = useState([
    {
      name: "Profile",
      activeIcon: profileActive,
      inactiveIcon: profileInactive,
    },
    {
      name: "Campaign Sequence ",
      activeIcon: sequenceActive,
      inactiveIcon: sequenceInactive,
    },
    {
      name: "Subscription & Billing",
      activeIcon: subscriptionActive,
      inactiveIcon: subscriptionInactive,
    },
  ]);
  const [menuActive, setMenuActive] = useState(0);
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card style={{ boxShadow: "none" }}>
              {/* <CardHeader className="p-3"> */}

              {/* </CardHeader> */}

              <CardBody className="p-3">
                <div style={{ borderBottom: "1px solid #E1E1E1" }}>
                  {menu.map((item, index) => {
                    return (
                      <span
                        className="d-inline-flex pe-4 pb-2"
                        style={{
                          borderBottom:
                            index === menuActive && "2px solid #1264FD",
                          color: index === menuActive ? "#1264FD" : "#595959",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                        onClick={() => setMenuActive(index)}
                      >
                        <Image
                          attrImage={{
                            src:
                              index === menuActive
                                ? item.activeIcon
                                : item.inactiveIcon,
                            className: "ms-2",
                          }}
                        />
                        <span
                          className="ms-2 me-3"
                          style={{ fontSize: "14px", fontWeight: 400 }}
                        >
                          {item.name}
                        </span>
                      </span>
                    );
                  })}
                </div>
                <div>
                  {" "}
                  {(() => {
                    switch (menuActive) {
                      case 0:
                        return <Profile />;
                      case 1:
                        return <Sequence />;
                      case 2:
                        return <Subscription />;
                      default:
                        return null;
                    }
                  })()}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Settings;
