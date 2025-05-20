import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { H5, H6, UL, LI, P, Image } from "../../../../AbstractElements";
import { Activity } from "../../../../constant";
import LineIcon from "../../../../assets/used-files/icons/Line1.svg";
import ViewIcon from "../../../../assets/used-files/icons/activity/view.svg";
import ConnectionIcon from "../../../../assets/used-files/icons/activity/Connection.svg";
import WithdrawIcon from "../../../../assets/used-files/icons/activity/withdrawl.svg";
import messageIcon from "../../../../assets/used-files/icons/activity/message.svg";
import arrowDownIcon from "../../../../assets/used-files/icons/activity/arrowDown.svg";
import { INSTANCE } from "Config/axiosInstance";

const ActivityCard = ({ jobId, candidateId }) => {
  const [activityData, setActivityData] = React.useState([]);
  console.log({ jobId, candidateId });

  useEffect(() => {
    const fetchCandidateActivity = async () => {
      try {
        const response = await INSTANCE.post("/candidate/activity", {
          candidateId: candidateId,
          jobId: jobId,
        });
        const data = response.data;
        setActivityData(data);
      } catch (error) {
        console.error("Error fetching candidate activity:", error);
      }
    };
    if (candidateId && jobId) {
      fetchCandidateActivity();
    }
  }, [jobId, candidateId]);

  // Function to format DateTime and group activities by the date
  const formatActivityData = (data) => {
    const formattedData = {};
    const activityKeys = [
      "profileFetched",
      "connectionRequestSent",
      "checkedConnectionRequestStatus",
      "connectionRequestAccepted",
      "messageSent",
      "checkedReplyStatus",
      "candidateReplied",
    ];

    // Loop through the activity keys and group the results by date
    activityKeys.forEach((key) => {
      if (data[key]) {
        const activityDate = data[`${key}At`]; // Get the corresponding date for the activity
        const activityLabel = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()); // Format key as title (e.g., 'Profile Fetched')

        // Only process the date if it's valid
        if (activityDate) {
          const formattedDate = new Date(activityDate);

          if (formattedDate.toString() === "Invalid Date") {
            console.error("Invalid Date for activity: ", key, activityDate);
            return; // Skip processing if the date is invalid
          }

          const readableDate = formattedDate.toLocaleDateString(); // Convert to readable date format

          // Initialize the date array if not already present
          if (!formattedData[readableDate]) {
            formattedData[readableDate] = [];
          }

          // Push activity item into the correct date array
          formattedData[readableDate].push({
            title: activityLabel,
            icon: getIconForActivity(key), // Dynamically select icon based on activity
            aContent: "Senior UI/UX Designers", // Modify dynamically based on context
            color: "primary",
            time: readableDate, // Store actual DateTime for the activity
          });
        }
      }
    });

    return formattedData;
  };

  // Get the appropriate icon for the activity
  const getIconForActivity = (key) => {
    switch (key) {
      case "profileFetched":
        return ViewIcon;
      case "connectionRequestSent":
        return ConnectionIcon;
      case "connectionRequestAccepted":
        return ConnectionIcon; // Modify if different icon needed
      case "messageSent":
        return messageIcon;
      case "candidateReplied":
        return WithdrawIcon; // Modify if different icon needed
      case "checkedConnectionRequestStatus":
        return messageIcon;
      case "checkedReplyStatus":
        return messageIcon;
      default:
        return LineIcon; // Fallback icon
    }
  };

  // Transform the API data to match the structure expected by the UI
  const ActivityDemoData = formatActivityData(activityData);

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
            {Object.entries(ActivityDemoData).map(([date, activities]) => (
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
                      {date} {/* This is the formatted date */}
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
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActivityCard;
