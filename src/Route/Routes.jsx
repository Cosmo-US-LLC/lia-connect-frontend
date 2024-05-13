// dashbaord
import Default from "../Components/Dashboard/Default";

//candidates
import CandidateDetail from "../Components/Alfren/Candidates/detail/index";
import CandidateLists from "../Components/Alfren/Candidates/list/index";

//jobs
import JobLists from "../Components/Alfren/Job/list/index";
import JobCreate from "../Components/Alfren/Job/create/index";
import JobDetail from "../Components/Alfren/Job/detail/index";

import ChatApp from "../Components/Alfren/ChatApp/index";
import Settings from "../Components/Alfren/Settings/index";

export const routes = [
  {
    path: `${process.env.PUBLIC_URL}/home`,
    Component: <Default />,
  },
  {
    path: `${process.env.PUBLIC_URL}/jobs`,
    Component: <JobLists />,
  },
  {
    path: `${process.env.PUBLIC_URL}/jobs/create`,
    Component: <JobCreate />,
  },
  {
    path: `${process.env.PUBLIC_URL}/jobs/detail/:id`,
    Component: <JobDetail />,
  },
  {
    path: `${process.env.PUBLIC_URL}/candidates`,
    Component: <CandidateLists />,
  },
  {
    path: `${process.env.PUBLIC_URL}/candidates/detail/:id`,
    Component: <CandidateDetail />,
  },
  {
    path: `${process.env.PUBLIC_URL}/settings`,
    Component: <Settings />,
  },
  {
    path: `${process.env.PUBLIC_URL}/messages`,
    Component: <ChatApp />,
  },
];
