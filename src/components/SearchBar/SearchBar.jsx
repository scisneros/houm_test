// Core
import React from 'react'
// Components
import SearchByText from './SearchByText'
import SearchByType from './SearchByType'
// Assets
import '../../assets/styles/search.css'


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
    const { disabled } = this.props
    return (
      <div className="search-container">
        <SearchByText
          handleSearchTextChange={this.handleSearchTextChange}
          handleSearchKeyPress={this.handleSearchKeyPress}
          handleSearchButton={this.handleSearchButton}
          disabled={disabled}
        />
        <SearchByType disabled={disabled} />
      </div>
    )
  }
}

export default SearchBar