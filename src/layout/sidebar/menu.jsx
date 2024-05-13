import ActiveCandidateIcon from "../../assets/used-files/icons/candidateActive.svg";
import {
  AlertOctagon,
  Home,
  MessageCircle,
  Search,
  Settings,
  User,
} from "react-feather";

export const MENUITEMS = [
  {
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/home`,
        icon: <Home strokeWidth={0.5} />,
        title: "Home",
        type: "link",
      },
      {
        title: "Jobs",
        icon: <Search strokeWidth={0.5} />,
        type: "sub",
        badge: "badge badge-light-primary",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/jobs`,
            title: "All Jobs",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/jobs/create`,
            title: "Create New Job",
            type: "link",
          },
        ],
      },
      {
        path: `${process.env.PUBLIC_URL}/candidates`,
        icon: <User strokeWidth={0.5} />,
        activeIcon: ActiveCandidateIcon,
        title: "Candidates",
        type: "link",
      },
      {
        path: `${process.env.PUBLIC_URL}/messages`,
        icon: <MessageCircle strokeWidth={0.5} />,
        title: "Messages",
        type: "link",
      },
      {
        path: `${process.env.PUBLIC_URL}/settings`,
        icon: <Settings strokeWidth={0.5} />,
        title: "Settings",
        type: "link",
      },
    ],
  },
];

export const MENUITEMSBOTTOM = [
  {
    Items: [
      {
        title: "Profile Menu",
        profile: true,
        icon: "",
        type: "sub",
        badge: "badge badge-light-primary",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/profile`,
            title: "Profile",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/messages`,
            title: "Messages",
            type: "link",
          },
        ],
      },
      {
        path: `${process.env.PUBLIC_URL}/home`,
        icon: <AlertOctagon strokeWidth={0.5} />,
        title: "FeedBack",
        type: "link",
      },
    ],
  },
];
