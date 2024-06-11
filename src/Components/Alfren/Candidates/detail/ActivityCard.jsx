import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { H5, H6, UL, LI, P, Image } from "../../../../AbstractElements";
import { Activity } from "../../../../Constant";
import LineIcon from "../../../../assets/used-files/icons/Line1.svg";
import ViewIcon from "../../../../assets/used-files/icons/activity/view.svg";
import ConnectionIcon from "../../../../assets/used-files/icons/activity/Connection.svg";
import WithdrawIcon from "../../../../assets/used-files/icons/activity/withdrawl.svg";
import messageIcon from "../../../../assets/used-files/icons/activity/message.svg";
import arrowDownIcon from "../../../../assets/used-files/icons/activity/arrowDown.svg";
const ActivityCard = () => {
  const ActivityData = {
    "Nov 2, 2023": [
      {
        title: "Viewed Profile of the candidate in",
        title2: "Campaign",
        subTitle: "Nov 2, 2023",
        aLink: "/",
        aContent: "Senior UI/UX Designers",
        color: "primary",
        icon: ViewIcon,
      },
    ],
    "Dec 12, 2023": [
      {
        title: "Sent connection request in",
        title2: "Campaign",
        subTitle: "Dec 12, 2023",
        aLink: "/",
        aContent: "Senior UI/UX Designers",
        color: "primary",
        icon: ConnectionIcon,
      },
      {
        title: "Withdraw connection request in",
        title2: "Campaign",
        subTitle: "Dec 12, 2023",
        aLink: "/",
        aContent: "Senior UI/UX Designers",
        color: "primary",
        icon: WithdrawIcon,
      },
    ],
    "Dec 15, 2023": [
      {
        title: "Send a message to the candidate in",
        title2: "Campaign",
        subTitle: "Dec 15, 2023",
        aLink: "/",
        aContent: "Senior UI/UX Designers",
        color: "primary",
        icon: messageIcon,
      },
    ],
    "Dec 24, 2023": [
      {
        title: "Send a follow up message in",
        title2: "Campaign",
        subTitle: "Dec 24, 2023",
        aLink: "/",
        aContent: "Senior UI/UX Designers",
        color: "primary",
        icon: messageIcon,
      },
    ],
    "Dec 30, 2023": [
      {
        title: "Send a follow up message in",
        title2: "Campaign",
        subTitle: "Dec 24, 2023",
        aLink: "/",
        aContent: "Senior UI/UX Designers",
        color: "primary",
        icon: messageIcon,
      },
    ],
  };

  return (
    <Col xxl="12" xl="12" md="12" sm="12" className="notification box-col-6">
      <Card className="height-equal">
        <CardHeader className="card-no-border">
          <div className="header-top">
            <H5 attrH5={{ className: "m-0" }}>
              <strong>{Activity}</strong>
            </H5>
          </div>
        </CardHeader>
        <CardBody
          className="pt-0"
          style={{ maxHeight: "550px", overflowY: "auto" }}
        >
          <UL>
            {Object.entries(ActivityData).map(([date, activities]) => (
              <li key={date}>
                <div className="d-flex justify-content-center mb-2">
                  <span className="date-content text-center">
                    <div
                      style={{
                        position: "absolute",
                        left: "40%",
                        backgroundColor: "#F5F9FF",
                        paddingLeft: "2%",
                        paddingRight: "2%",
                        borderRadius: "20px",
                      }}
                    >
                      {date}
                    </div>
                    <Image
                      attrImage={{
                        src: LineIcon,
                        alt: "Line Icon", // Add an alt description
                      }}
                      style={{ position: "relative" }} // Center the image horizontally
                    />
                  </span>
                </div>
                {activities.map((activity, index) => (
                  <LI key={index} attrLI={{ className: "d-flex" }}>
                    <div>
                      <Image
                        attrImage={{
                          src: activity.icon,
                          alt: "Line Icon", // Add an alt description
                        }}
                        style={{ position: "relative" }} // Center the image horizontally
                      />
                    </div>
                    <div className="w-100 ms-3 ">
                      <P
                        attrPara={{
                          className: "d-flex justify-content-between mb-2",
                        }}
                      >
                        <span className="activity-title">
                          {activity.title}{" "}
                          {activity.title2 && (
                            <span>
                              {" "}
                              <span style={{ color: "#1264FD" }}>
                                {activity.aContent}
                              </span>{" "}
                              {activity.title2}
                            </span>
                          )}
                        </span>
                        <span>{activity.time}</span>
                      </P>
                      <H6>{activity.dis}</H6>
                    </div>
                  </LI>
                ))}
              </li>
            ))}
          </UL>
          <div className="blurred-container">
            <Image
              attrImage={{
                src: arrowDownIcon,
                alt: "Line Icon", // Add an alt description
              }}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActivityCard;
