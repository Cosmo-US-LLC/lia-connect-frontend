import React from "react";
import { Card, CardBody } from "reactstrap";
import { H4 } from "../../../AbstractElements";
import SvgIcon from "../Component/SvgIcon";
import CountUp from "react-countup";

const Widgets1 = ({ data }) => {
  return (
    <Card className="widget-1">
      <CardBody>
        <div className="widget-content">
          <div className={`widget-roun ${data.color}`} style={data?.style}>
            <div className="bg-round">
              <SvgIcon className="svg-fill" iconId={`${data.icon}`} />
            </div>
          </div>
          <div>
            <H4>
              {data.animation === true ? (
                <CountUp end={data.total} duration={3} />
              ) : (
                data.total
              )}
            </H4>
            <span className="f-light">{data.title}</span>
          </div>
        </div>
        <div className={`font-${data.color} f-w-500`}>
          <i
            className={`icon-arrow-${
              data.gros < 50 ? "down" : "up"
            } icon-rotate me-1`}
          />
          <span>{`${data.gros < 50 ? "-" : "+"}${data.gros}%`}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default Widgets1;
