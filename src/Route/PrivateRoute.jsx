import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate exact to={`${process.env.PUBLIC_URL}/auth/login`} />
  );
};

export default PrivateRoute;
