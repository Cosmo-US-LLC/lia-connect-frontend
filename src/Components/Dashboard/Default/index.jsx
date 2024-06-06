import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import GreetingCard from "./GreetingCard";
import WidgetsWrapper from "./WidgetsWraper";
import { useAuth } from "_helper/UserSignUp";
import UserLogin from "Components/Alfren/Auth/user-login";




const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <UserLogin />;
  }

  return (
    <Fragment>
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard />
          <WidgetsWrapper />
          {/* <OverallBalance /> */}
          {/* <RecentOrders /> */}
          {/* <ActivityCard /> */}
          {/* <RecentSales /> */}
          {/* <TimelineCard /> */}
          {/* <PreAccountCard /> */}
          {/* <TotalUserAndFollower /> */}
          {/* <PaperNote /> */}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;