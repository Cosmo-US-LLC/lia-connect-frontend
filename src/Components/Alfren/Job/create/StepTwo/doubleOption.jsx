import { Fragment } from "react";
import { Line } from "./line";
import { Clock, MoreVertical } from "react-feather";
import { HorizontalLine } from "./horizontalLine";
export const DoubleOption = ({ x, y1, x2, y2 }) => {
  return (
    <Fragment>
      <Line marginBottom={0} marginTop={10} />
      <HorizontalLine />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            border: "1px dashed  #DADADA",
            boxShadow: "0px 6px 20px 0px #0000000F",
            borderRadius: "4px",
            color: "black",
            backgroundColor: "#FFEFBD",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              padding: "10px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Clock size={15} strokeWidth={1} />
          </span>
          <span style={{ color: "#595959", padding: "10px" }}> 14 hours </span>
          <span
            style={{
              padding: "10px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <MoreVertical size={15} strokeWidth={3} />
          </span>
        </div>
        <div
          style={{
            border: "1px dashed  #DADADA",
            boxShadow: "0px 6px 20px 0px #0000000F",
            borderRadius: "4px",
            color: "black",
            backgroundColor: "#FFEFBD",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              padding: "10px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Clock size={15} strokeWidth={1} />
          </span>
          <span style={{ color: "#595959", padding: "10px" }}> 14 hours </span>
          <span
            style={{
              padding: "10px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <MoreVertical size={15} strokeWidth={3} />
          </span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Line marginBottom={10} marginTop={10} />
        <Line marginBottom={10} marginTop={10} />
      </div>
    </Fragment>
  );
};
