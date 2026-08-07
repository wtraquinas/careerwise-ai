import { DataGrid } from "@mui/x-data-grid";
import { companyColumns } from "./companyColumns";

export default function CompanyTable({
    companies,
    onEdit,
    onDelete,
}) {
    return (
        <DataGrid
            rows={companies}
            columns={companyColumns(onEdit, onDelete)}
            pageSizeOptions={[5, 10]}
            autoHeight
            disableRowSelectionOnClick
        />
    );
}