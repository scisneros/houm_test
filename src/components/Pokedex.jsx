// Core
import React from 'react'
// Components
import Pagination from './Pagination/Pagination'
import PokeCard from './PokeCard/PokeCard'
// Assets
import '../assets/styles/pokedex.css'
import spritePlaceholder from '../assets/sprites/sprite-placeholder.png'
// Fixture
import pkFixture from '../fixtures/pk'



class Pokedex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemonFullResults: [],
      currentLimit: 20,
      currentPage: 1,
      currentTotal: 0,
      isLoading: true,
    }

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  fetchAllPokemon(limit, offset) {
    this.setState({ isLoading: true })
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(initialData => {
      let promises = []
      for (const pokemon of initialData.results) {
        promises.push(fetch(pokemon.url))
      }
      Promise.all(promises).then((results) => {
        Promise.all(results.map(res => res.json())).then(fullData => {
          this.setState({ pokemonFullResults: fullData, currentTotal: initialData.count, isLoading: false },() => console.log(this.state.pokemonFullResults))
        })
      })
    })
    .catch(error => {
      this.setState({ pokemonFullResults: [] })
      console.log(error)
    })
  }

  fetchPokemonInfo(list) {
    let promises = []
    for (const pokemon of list) {
      promises.push(fetch(pokemon.url))
    }
    Promise.all(promises).then((results) => {
      Promise.all(results.map(res => res.json())).then(data => {
        this.setState({ pokemonFullResults: data }, () => console.log(this.state.pokemonFullResults))
      })
    })
  }

  handlePageChange(page) {
    console.log(page)
    this.setState({ currentPage: page })
  }

  componentDidMount () {
    this.fetchAllPokemon(this.state.currentLimit, 0)
    // this.setState({ pokemonFullResults: pkFixture })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { currentPage, currentLimit } = this.state
    if (prevState.currentPage !== currentPage) {
      this.fetchAllPokemon(currentLimit, (currentPage-1)*currentLimit)
    }
  }

  render() {
    let { pokemonFullResults, currentTotal, currentLimit, currentPage, isLoading } = this.state
    let pokemonList = pokemonFullResults.map((pk) => {
      let sprite = spritePlaceholder
      let types = [null, null]
      let stats = {}
      let adjStats = {}
      let abilities = []
      let height = 0
      let weight = 0
      let isTop = false

      if (!isLoading) {
        if (pk.sprites && pk.sprites.front_default) {
          sprite = pk.sprites.front_default
        }
        if (pk.types) {
          for (const type of pk.types) {
            types[(type.slot - 1)] = type.type.name
          }
        }
        if (pk.abilities) {
          for (const abil of pk.abilities) {
            abilities.push(abil.ability.name)
          }
        }
        if (pk.height) {
          height = pk.height
        }
        if (pk.weight) {
          weight = pk.weight
        }
      }
      if (pk.stats) {
        let sum = 0
        for (const stat of pk.stats) {
          sum += stat.base_stat
          stats[stat.stat.name] = stat.base_stat
          adjStats[stat.stat.name] = (Math.pow(stat.base_stat / 255, 0.5))
        }
        if (sum >= 525) {
          isTop = true
        }
      }
      return {
        name: pk.name,
        sprite: sprite,
        number: pk.id || "-",
        types: types,
        stats: stats,
        adjStats: adjStats,
        isTop: isTop,
        height: height,
        weight: weight,
        abilities: abilities,
      }
    })
    const numberOfPages = Math.ceil(currentTotal / currentLimit)
    return (
      <div className="pokedex">
        <div className={"pk-cards" + (isLoading ? " loading-disable" : "")}>
          {pokemonList.map((pokemon) => (
            <PokeCard pokemon={pokemon}/>
          ))}
        </div>
        <Pagination totalPages={numberOfPages} activePage={currentPage}
                    handlePageChange={this.handlePageChange} disabled={isLoading}
                    range={3}
        />
      </div>
    )
  }
}

export default Pokedex