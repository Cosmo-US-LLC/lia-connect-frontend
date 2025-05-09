import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";

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

const Dashboard = () => {
  // Retrieve isLinkedInLogin from localStorage
  const isLinkedInLogin = localStorage.getItem("isLinkedInLogin");
  console.log('isLinkedInLogin', isLinkedInLogin)
  // if (isLinkedInLogin===null) {
  //   return <UserLogin />;
  // }else{
  return (
    <Fragment>
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard isLinkedInLogin={isLinkedInLogin} />
          <WidgetsWrapper />
           {/* <OverallBalance />  */}
           {/* <ActivityCard />
           <RecentOrders />  */}
           
           {/* <RecentSales />  */}
           {/* <TimelineCard />  */}
           {/* <PreAccountCard />  */}
           {/* <TotalUserAndFollower /> 
           <PaperNote />  */}
        </Row>
      </Container>
    </Fragment>
  );
  // }
};

export default Dashboard;