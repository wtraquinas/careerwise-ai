import {
    Chip,
    IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const companyColumns = (onEdit, onDelete) => [
    {
        field: "name",
        headerName: "Company",
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
                rel="noreferrer"
            >
                {params.value}
            </a>
        ),
    },

    {
        field: "industry",
        headerName: "Industry",
        width: 180,
    },

    {
        field: "location",
        headerName: "Location",
        width: 180,
    },

    {
        field: "actions",
        headerName: "Actions",
        width: 130,

        renderCell: (params) => (
            <>
                <IconButton
                    color="primary"
                    onClick={() => onEdit(params.row)}
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    color="error"
                    onClick={() => onDelete(params.row)}
                >
                    <DeleteIcon />
                </IconButton>
            </>
        ),
    },
];