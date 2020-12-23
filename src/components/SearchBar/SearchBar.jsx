// Core
import React from 'react'
// Components
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/cjs/Button'
// Assets
import '../../assets/styles/search.css'
import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';

class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: "",
    }

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this)
  }

  handleSearchTextChange(e) {
    this.setState({searchText: e.target.value})
  }

  handleSearchButton(e) {
    this.props.handleSearchByName(this.state.searchText)
  }

  handleSearchKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearchButton()
    }
  }

  render() {
    const { searchText } = this.state
    return (
      <div className="search-container">
        <div className="search-text-wrapper">
          <InputGroup >
            <FormControl
              placeholder="Search by exact name or number"
              aria-label="Search by exact name or number"
              aria-describedby="basic-addon2"
              value={searchText}
              onChange={this.handleSearchTextChange}
              onKeyPress={this.handleSearchKeyPress}
            />
            <InputGroup.Append>
              <Button className="btn-search" variant="secondary" onClick={this.handleSearchButton}>
                <IconSearch className="icon-search"/>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    )
  }
}

export default SearchBar