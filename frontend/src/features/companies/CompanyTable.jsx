import { DataGrid } from "@mui/x-data-grid";
import { companyColumns } from "./companyColumns";

export default function CompanyTable({ companies }) {
  const handleEdit = (company) => {
    console.log("Edit", company);
  };

  const handleDelete = (company) => {
      console.log("Delete", company);
  };
  return (
    <DataGrid
      rows={companies}
      columns={companyColumns(handleEdit, handleDelete)}
      pageSizeOptions={[5, 10]}
      autoHeight
      disableRowSelectionOnClick
    />
  );
}