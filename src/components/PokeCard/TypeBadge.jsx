import React from 'react'
import '../../assets/styles/types.css'

class TypeBadge extends React.Component {
  render() {
    const { type } = this.props
    return (
      <div className="pk-type-wrapper">
        <span className={"pk-type pk-type-" + (type ? type : "null")}>
          {type || ""}
        </span>
      </div>

    )
  }
}


export default TypeBadge