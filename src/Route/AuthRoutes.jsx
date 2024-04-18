import Login from "../Components/Alfren/Auth/login/index";
import ForgotPassword from "../Components/Alfren/Auth/forgotPassword/index";
import ResetPassword from "../Components/Alfren/Auth/resetPassword/index";
import Register from "../Components/Alfren/Auth/register/index";

export const authRoutes = [
  { path: `${process.env.PUBLIC_URL}/auth/login`, Component: <Login /> },
  {
    path: `${process.env.PUBLIC_URL}/auth/forgot-password`,
    Component: <ForgotPassword />,
  },
  {
    path: `${process.env.PUBLIC_URL}/auth/reset-password`,
    Component: <ResetPassword />,
  },
  {
    path: `${process.env.PUBLIC_URL}/auth/register`,
    Component: <Register />,
  },
];
