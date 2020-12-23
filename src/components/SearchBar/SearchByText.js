import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/cjs/Button'
import { ReactComponent as IconSearch } from '../../assets/icons/search.svg'

function SearchByText (props) {
  const { disabled } = props
  return (
    <div className="search-text-wrapper">
      <InputGroup >
        <FormControl
          placeholder="Search by exact name or number"
          aria-label="Search by exact name or number"
          aria-describedby="basic-addon2"
          value={props.value}
          onChange={props.handleSearchTextChange}
          onKeyPress={props.handleSearchKeyPress}
          disabled={disabled}
        />
        <InputGroup.Append>
          <Button disabled={disabled} className="btn-search" variant="secondary" onClick={props.handleSearchButton}>
            <IconSearch className="icon-search"/>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}

export default SearchByText