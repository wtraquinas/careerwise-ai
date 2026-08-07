import { DataGrid } from "@mui/x-data-grid";

import { applicationColumns } from "./applicationColumns";

export default function ApplicationTable({

    applications,

    companyMap,

    onEdit,

    onDelete,

}) {

    return (

        <DataGrid

            rows={applications}

            columns={applicationColumns(

                companyMap,

                onEdit,

                onDelete

            )}

            pageSizeOptions={[10, 25, 50]}

            initialState={{

                pagination: {

                    paginationModel: {

                        pageSize: 10,

                    },

                },

            }}

            autoHeight

            disableRowSelectionOnClick

        />

    );

}