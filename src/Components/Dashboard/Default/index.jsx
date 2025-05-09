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
import axios from "axios";
// import { fetchStats } from "redux/Job/jobActions";
import { fetchStats } from "../../../redux/Job/jobActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();

  // const api = `http://localhost:3001/v1`;
  const [data, setData] = React.useState();

  useEffect(() => {
    const url = `/jobs/stats`;
    dispatch(fetchStats(url, handleFetchResponse));
  }, [dispatch]);

  const handleFetchResponse = (resp) => {
    if (resp?.status === 200) {
      setData(resp.data);
    } else {
      toast.error(resp?.message);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  // if (!isLinkedInConnected) {
  //   return <UserLogin />;
  // }

  return (
    <Fragment>
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard isLinkedInLogin={isLinkedInConnected} />
          <WidgetsWrapper />
          {/* <OverallBalance /> */}
          {/* <ActivityCard />
          <RecentOrders /> */}

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
