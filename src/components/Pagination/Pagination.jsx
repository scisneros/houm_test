import React from 'react'
import PaginationItem from './PaginationItem'
import PaginationEllipsis from './PaginationEllipsis'
import '../../assets/styles/pagination.css'

class Pagination extends React.Component {

  render () {
    const { totalPages, activePage, handlePageChange, disabled } = this.props
    if (totalPages <= 1) return "";
    const range = this.props.range || 2
    let items = []
    if (activePage - range > 1) {
      items.push(1)
      items.push("...")
    }
    for (let i = Math.max(activePage - range, 1); i <= Math.min(activePage + range, totalPages); i++) {
      items.push(i)
    }
    if (activePage + range < totalPages) {
      items.push("...")
      items.push(totalPages)
    }
    return (
      <div className="pagination-container">
        {items.map((page) => {
          if (page === "...") {
            return <PaginationEllipsis />
          } else {
            return <PaginationItem number={page} isActive={page === activePage}
                                   onClick={disabled ? null : (e) => handlePageChange(page)}/>
          }
        })}
      </div>
    )
  }
}

export default Pagination