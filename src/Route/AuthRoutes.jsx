import Login from "../Components/Alfren/Auth/login/index";
import ForgotPassword from "../Components/Alfren/Auth/forgotPassword/index";

export const authRoutes = [
  { path: `${process.env.PUBLIC_URL}/login`, Component: <Login /> },
  {
    path: `${process.env.PUBLIC_URL}/auth/forgot-password`,
    Component: <ForgotPassword />,
  },
];
