export const breadcrumbData = [
  {
    path: "/dashboard",
    label: "Home",
    children: [],
  },
  {
    path: "/candidates",
    label: "Candidates",
    children: [
      {
        path: "/candidates/:id",
        label: "Candidate Details",
      },
    ],
  },
];
