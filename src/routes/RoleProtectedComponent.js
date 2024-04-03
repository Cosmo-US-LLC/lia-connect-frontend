import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function withRoleAccess(Component, allowedRoles) {
  return function (props) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && allowedRoles.includes(user.role.id)) {
      return <Component {...props} />;
    } else {
      switch (user.role.id) {
        case 1:
          return (
            <Navigate to={`${process.env.PUBLIC_URL}/super-admin/dashboard`} />
          );
        case 2:
          return (
            <Navigate to={`${process.env.PUBLIC_URL}/saloon-admin/dashboard`} />
          );
        case 3:
          return (
            <Navigate to={`${process.env.PUBLIC_URL}/saloon-staff/dashboard`} />
          );
        default:
          return <Navigate to={`${process.env.PUBLIC_URL}/dashboard`} />;
      }
    }
  };
}

export default withRoleAccess;
