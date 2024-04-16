import Login from "../Components/Alfren/Auth/login/index";

export const authRoutes = [
  { path: `${process.env.PUBLIC_URL}/login`, Component: <Login /> },
];
