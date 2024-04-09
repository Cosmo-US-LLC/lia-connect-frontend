import HomeIcon from "../../assets/used-files/icons/house.svg";
import JobIcon from "../../assets/used-files/icons/job.svg";
import CandidateIcon from "../../assets/used-files/icons/candidate.svg";
import MessageIcon from "../../assets/used-files/icons/message.svg";
import SettingsIcon from "../../assets/used-files/icons/settings.svg";
import FeedBackIcon from "../../assets/used-files/icons/Feedback.svg";
import LogoutIcon from "../../assets/used-files/icons/logout.svg";
import ActiveCandidateIcon from "../../assets/used-files/icons/candidateActive.svg";

export const MENUITEMS = [
  {
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/dashboard/default`,
        icon: HomeIcon,
        title: "Home",
        type: "link",
      },
      {
        title: "Jobs ",
        icon: JobIcon,
        type: "sub",
        badge: "badge badge-light-primary",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/dashboard/default`,
            title: "All Jobs",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/dashboard/e-commerce`,
            title: "Create New Job",
            type: "link",
          },
        ],
      },
      {
        path: `${process.env.PUBLIC_URL}/candidates`,
        icon: CandidateIcon,
        activeIcon: ActiveCandidateIcon,
        title: "Candidates",
        type: "link",
      },
      {
        path: `${process.env.PUBLIC_URL}/app/file-manager`,
        icon: MessageIcon,
        title: "Messages",
        type: "link",
      },
      {
        path: `${process.env.PUBLIC_URL}/app/file-manager`,
        icon: SettingsIcon,
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
        icon: JobIcon,
        type: "sub",
        badge: "badge badge-light-primary",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/dashboard/default`,
            title: "Profile",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/dashboard/e-commerce`,
            title: "Messages",
            type: "link",
          },
        ],
      },
      {
        path: `${process.env.PUBLIC_URL}/app/file-manager`,
        icon: FeedBackIcon,
        title: "FeedBack",
        type: "link",
      },
      {
        path: `${process.env.PUBLIC_URL}/app/file-manager`,
        icon: LogoutIcon,
        color: "#AA1313",
        title: "Logout",
        type: "link",
      },
    ],
  },
];
