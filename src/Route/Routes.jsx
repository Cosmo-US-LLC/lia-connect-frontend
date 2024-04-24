// dashbaord
import Default from "../Components/Dashboard/Default";

//candidates
import CandidateDetail from "../Components/Alfren/Candidates/detail/index";
import CandidateLists from "../Components/Alfren/Candidates/list/index";

//jobs
import JobLists from "../Components/Alfren/Job/list/index";
import JobCreate from "../Components/Alfren/Job/create/index";

export const routes = [
  {
    path: `${process.env.PUBLIC_URL}/dashboard`,
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
    path: `${process.env.PUBLIC_URL}/candidates`,
    Component: <CandidateLists />,
  },
  {
    path: `${process.env.PUBLIC_URL}/candidates/:id`,
    Component: <CandidateDetail />,
  },
];
