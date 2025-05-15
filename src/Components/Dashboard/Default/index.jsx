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
  const [data, setData] = React.useState(null);
  const [connectModel, setConnectModel] = useState(false);

  useEffect(() => {
    const url = `/jobs/jobs-stats`;
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

  if (loading || data === null) {
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
          <GreetingCard isLinkedInLogin={isLinkedInConnected} connectModel={connectModel} setConnectModel={setConnectModel} />
          <WidgetsWrapper dataList={data} />
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
      
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "999",
          width: "100%",
          height: "100%",
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: connectModel ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "999",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={() => setConnectModel(false)}
        ></div>
        <div
          style={{
            backgroundColor: "white",
            // padding: "20px",
            borderRadius: "10px",
            width: "900px",
            textAlign: "center",
            position: "relative",
            zIndex: "1000",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <UserLogin setConnectModel={setConnectModel} />
          {/* <button onClick={() => setConnectModel(false)}>Close</button> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
