import { DataGrid } from "@mui/x-data-grid";
import { companyColumns } from "./companyColumns";

export default function CompanyTable({ companies }) {
  return (
    <DataGrid
      rows={companies}
      columns={companyColumns}
      pageSizeOptions={[5, 10]}
      autoHeight
      disableRowSelectionOnClick
    />
  );
}