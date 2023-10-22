import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageClick, pageCount }) => {
  return (
    <ReactPaginate
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={8}
      pageCount={pageCount}
      previousLabel="Prev"
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center gap-2 items-center"
      pageClassName="pagination-item-style"
      activeClassName="bg-amber-500 text-white"
      previousClassName="pagination-item-style"
      nextClassName="pagination-item-style"
      disabledClassName="disabled-item"
    />
  );
};

export default Pagination;
