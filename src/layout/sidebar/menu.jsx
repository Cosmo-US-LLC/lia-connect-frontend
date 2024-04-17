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
        path: `${process.env.PUBLIC_URL}/dashboard`,
        icon: <Home strokeWidth={1} />,
        title: "Home",
        type: "link",
      },
      {
        title: "Jobs ",
        icon: <Search strokeWidth={1} />,
        type: "sub",
        badge: "badge badge-light-primary",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/dashboard`,
            title: "All Jobs",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/dashboard`,
            title: "Create New Job",
            type: "link",
          },
        ],
      },
      {
        path: `${process.env.PUBLIC_URL}/candidates`,
        icon: <User strokeWidth={1} />,
        activeIcon: ActiveCandidateIcon,
        title: "Candidates",
        type: "link",
      },
      {
        path: `${process.env.PUBLIC_URL}/dashboard`,
        icon: <MessageCircle strokeWidth={1} />,
        title: "Messages",
        type: "link",
      },
      {
        path: `${process.env.PUBLIC_URL}/dashboard`,
        icon: <Settings strokeWidth={1} />,
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
            path: `${process.env.PUBLIC_URL}/dashboard`,
            title: "Profile",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/dashboard`,
            title: "Messages",
            type: "link",
          },
        ],
      },
      {
        path: `${process.env.PUBLIC_URL}/dashboard`,
        icon: <AlertOctagon strokeWidth={1} />,
        title: "FeedBack",
        type: "link",
      },
    ],
  },
];
