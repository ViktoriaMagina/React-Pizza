import styles from './Pagination.module.scss'

import ReactPaginate from 'react-paginate';
const Pagination =  ({setCurrentPage}) => {
    return(
        <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageCount = {3}
        pageRangeDisplayed = {4}
        onPageChange={(event) => setCurrentPage(event.selected + 1)}
      />
    )
}

export default Pagination