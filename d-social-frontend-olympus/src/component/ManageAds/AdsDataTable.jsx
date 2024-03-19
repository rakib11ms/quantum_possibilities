import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function AdsDataTable({ rows, columns, setSelectedRowsId }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowSelection={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onRowSelectionModelChange={(r) => {
          // console.log(r);
          setSelectedRowsId(r);
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
          {
            outline: "none !important",
          },
        }}
      />
    </div>
  );
}
