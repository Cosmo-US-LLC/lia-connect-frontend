import React from "react";
import { Col, Row } from "reactstrap";
import Widgets1 from "../../Common/CommonWidgets/Widgets1";
import Widgets2 from "../../Common/CommonWidgets/Widgets2";
import { BorderRadius } from "constant";

const WidgetsWrapper = ({dataList}) => {
  console.log(dataList);
  const data = [
    {
      title: "Total Jobs",
      gros: 50,
      total: dataList?.jobs?.total || 0,
      color: "secondary",
      icon: "svg/case.svg",
      animation : true,
      style: { backgroundColor: "#ffc107", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }
    },
    {
      title: "In Progress",
      gros: 20,
      total: dataList?.jobs?.in_progress || 0,
      color: "warning",
      icon: "svg/glass.svg",
      animation : true,
      style: { backgroundColor: "black", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }
    },
    {
      title: "Completed Jobs",
      gros: 70,
      total: dataList?.jobs?.completed || 0,
      color: "primary",
      icon: "svg/flag.svg",
      animation : true,
      style: { backgroundColor: "#007bff", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }
    },
    {
      title: "Connection Requests Sent",
      gros: 70,
      total: dataList?.connections?.requests || 0,
      color: "info",
      icon: "svg/user-add.svg",
      animation : true,
      style: { backgroundColor: "#29a746", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }
    },
    {
      title: "Messages Sent",
      gros: 70,
      total: dataList?.connections?.message_sent || 0,
      color: "danger",
      icon: "svg/message.svg",
      animation : true,
      style: { backgroundColor: "#dc3545", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }
    },
    {
      title: "Replies Received",
      gros: 70,
      total: dataList?.connections?.replies || 0,
      color: "muted",
      icon: "svg/join.svg",
      animation : true,
      style: { backgroundColor: "#6c757d", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }
    },
    {
      title: "Profiles In Processing",
      gros: 70,
      total: dataList?.processing_profiles || 0,
      color: "muted",
      icon: "svg/process.svg",
      animation : true,
      style: { backgroundColor: "#2ea5f0", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }
    }
  ]
  return (
    <>
      <Col xl="4">
        <Widgets1 data={data[0]} />
      </Col>
      <Col xl="4">
        <Widgets1 data={data[1]} />
      </Col>
      <Col xl="4">
        <Widgets1 data={data[2]} />
      </Col>
      <Col xl="4">
        <Widgets1 data={data[3]} />
      </Col>
      <Col xl="4">
        <Widgets1 data={data[4]} />
      </Col>
      <Col xl="4">
        <Widgets1 data={data[5]} />
      </Col>
      <Col xl="4">
        <Widgets1 data={data[6]} />
      </Col>
      {/* <Col xl="3">
        <Widgets1 data={WidgetsData4} />
      </Col> */}
      {/* <Col xxl='auto' xl='12' sm='6' className='box-col-6'>
        <Row>
          <Col xxl='12' xl='6' className='box-col-12'>
            <Widgets2 data={Widgets2Data} />
          </Col>
          <Col xxl='12' xl='6' className='box-col-12'>
            <Widgets2 chartClass='profit-chart ' data={Widgets2Data2} />
          </Col>
        </Row>
      </Col> */}
    </>
  );
};

export default WidgetsWrapper;
