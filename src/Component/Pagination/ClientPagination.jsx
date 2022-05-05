import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";

const ClientPagination = (props) => {
  const { pagination, onPageChange } = props;
  const { current_page, to, totalRows, totalPages } = pagination;
  const [page, setPage] = useState(current_page);
  const [rowsPerPage, setRowsPerPage] = useState(to);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage + 1, rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (onPageChange) {
      onPageChange(0, parseInt(event.target.value, 10));
    }
  };

  return (
    <>
      <TablePagination
        count={totalRows}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ClientPagination;
