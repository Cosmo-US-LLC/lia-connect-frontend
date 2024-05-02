export const breadcrumbData = [
  {
    path: "/home",
    label: "Home",
    icon: "Home",
  },
  {
    path: "/candidates",
    label: "Candidates",
    icon: "Candidate",
  },
  {
    path: "/candidates/detail/:id",
    label: "Detail View",
    icon: "Candidate",
    parent: {
      label: "Candidates",
      path: "/candidates",
    },
  },

  {
    path: "/jobs",
    label: "Jobs",
    icon: "Job",
  },
  {
    path: "/jobs/create",
    label: "Create New Job",
    icon: "Job",
    parent: {
      label: "Jobs",
      path: "/jobs",
    },
  },
  {
    path: "/jobs/detail/:id",
    label: "Detail View",
    icon: "Job",
    parent: {
      label: "Jobs",
      path: "/jobs",
    },
  },
];
