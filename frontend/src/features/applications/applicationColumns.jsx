import {
    Chip,
    IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const statusColor = {
    Applied: "primary",
    Interview: "warning",
    Assessment: "info",
    Offer: "success",
    Accepted: "success",
    Rejected: "error",
};

export const applicationColumns = (
    companyMap,
    onEdit,
    onDelete,
    onAnalyze
) => [

    {
        field: "company_id",
        headerName: "Company",
        flex: 1,
        valueGetter: (params) =>
            companyMap[params] ?? params,
    },

    {
        field: "position",
        headerName: "Position",
        flex: 1.5,
    },

    {
        field: "status",
        headerName: "Status",
        flex: 1,

        renderCell: ({ value }) => (
            <Chip
                label={value}
                color={statusColor[value] || "default"}
                size="small"
            />
        ),
    },

    {
        field: "salary",
        headerName: "Salary",
        flex: 1,
    },

    {
        field: "applied_date",
        headerName: "Applied",
        flex: 1,
    },

    {
        field: "actions",
        headerName: "Actions",
        width: 150,
        sortable: false,
        filterable: false,

        renderCell: ({ row }) => (
            <>
                <IconButton
                    color="primary"
                    size="small"
                    onClick={() => onEdit(row)}
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => onAnalyze(row)}
                >
                    <AutoAwesomeIcon />
                </IconButton>

                <IconButton
                    color="error"
                    size="small"
                    onClick={() => onDelete(row)}
                >
                    <DeleteIcon />
                </IconButton>
            </>
        ),
    },

];