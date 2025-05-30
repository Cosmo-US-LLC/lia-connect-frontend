import React from "react";

const SvgIcon = (props) => {
  const { iconId, ...res } = props;
  return (
    <svg {...res}>
      <use href={`${process.env.PUBLIC_URL}/svg/linkedin.svg#${iconId}`}></use>
    </svg>
  );
};

export default SvgIcon;
