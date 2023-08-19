

import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.

function Pagination({ changePage, count }) {
  return (
    <section id="pagination">
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={count}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={changePage}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </section>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
export default Pagination;
