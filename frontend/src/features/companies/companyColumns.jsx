export const companyColumns = [
  {
    field: "name",
    headerName: "Company",
    flex: 2,
  },
  {
    field: "industry",
    headerName: "Industry",
    flex: 1,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
  },
  {
    field: "website",
    headerName: "Website",
    flex: 1,
    renderCell: (params) => (
      <a
        href={params.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit
      </a>
    ),
  },
];