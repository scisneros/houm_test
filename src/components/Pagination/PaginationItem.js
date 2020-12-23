import React from "react"

function PaginationItem(props) {
  return (
    <div className={"pagination-item" + (props.isActive ? " page-active" : "")}
         onClick={props.onClick}>
      <span>{props.number}</span>
    </div>
  )
}

export default PaginationItem