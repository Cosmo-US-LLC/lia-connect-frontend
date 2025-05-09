import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Spinner } from "reactstrap";
import OverallBalance from "./OverallBalance";
import GreetingCard from "./GreetingCard";
import WidgetsWrapper from "./WidgetsWraper";
import RecentOrders from "./RecentOrders";
import ActivityCard from "./ActivityCard";
import RecentSales from "./RecentSales";
import TimelineCard from "./TimelineCard";
import PreAccountCard from "./PreAccountCard";
import TotalUserAndFollower from "./TotalUserAndFollower";
import PaperNote from "./PaperNote";
import UserLogin from "Components/Alfren/Auth/user-login";
import { INSTANCE } from "Config/axiosInstance";

const Dashboard = () => {
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await INSTANCE.post("/auth/checkLinkedInStatus");
        setIsLinkedInConnected(response.data.isLinkedInConnected);
      } catch (error) {
        console.error("Error checking LinkedIn status:", error);
        setIsLinkedInConnected(false);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner color="primary" />
      </Container>
    );
  }

  if (!isLinkedInConnected) {
    return <UserLogin />;
  }

  return (
    <Fragment>
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard />
          <WidgetsWrapper />
          {/* <OverallBalance /> */}
          <ActivityCard />
          <RecentOrders />

          {/* <RecentSales /> */}
          {/* <TimelineCard /> */}
          {/* <PreAccountCard /> */}
          {/* <TotalUserAndFollower />
              <PaperNote /> */}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
