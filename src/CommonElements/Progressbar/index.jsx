import React from "react";
import { Progress, UncontrolledTooltip } from "reactstrap";

const Progressbar = ({ attrProgress = {}, children, tooltip = "" }) => {
  const { id, ...rest } = attrProgress;

  return (
    <>
      <Progress
        {...rest}
        id={id}
        style={{ height: "8px", ...attrProgress.style }}
      >
        {children}
      </Progress>

      {tooltip && id && (
        <UncontrolledTooltip
          target={id}
          placement="top"
          offset={[0, 8]}
          style={{
            backgroundColor: "#595959",
            boxShadow: "0px 6px 26px -3.89px #0000001A",
            fontSize: "14px",
            padding: "8px 16px",
            borderRadius: "4px",
            color: "white",
          }}
        >
          {tooltip}
        </UncontrolledTooltip>
      )}
    </>
  );
};

export default Progressbar;

// import React from 'react';
// import { Progress } from 'reactstrap';

// const Progressbar =(props) =>(
//   <Progress style={{height:'8px'}} {...props.attrProgress} >{props.children}</Progress>
// );

// export default Progressbar;
