// import Default from "../components/dashboard";
import UserRegister from "../components/auth/user-register";
import Dashboard from "../components/dashboard";
import withRoleAccess from "./RoleProtectedComponent";

export const routes = [
  { path: "/dashboard", Component: Dashboard },
  // {
  //   path: "/dashboard",
  //   Component: withRoleAccess(Dashboard, [4]),
  // },
];
