import React from "react";

const SvgIcon = (props) => {
  const { iconId, ...res } = props;
  return (
    // <svg {...res}>
    //   <use href={`${process.env.PUBLIC_URL}/svg/linkedin.svg#${iconId}`}></use>
    // </svg>
    <img
      src={`${process.env.PUBLIC_URL}/${iconId}`}
      alt="Widget Icon"
      style={{ width: "20px", height: "20px" }}
    />
  );
};

export default SvgIcon;
