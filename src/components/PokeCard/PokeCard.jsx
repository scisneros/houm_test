// Core
import React from 'react'
// Components
import { ReactComponent as IconStar } from '../../assets/icons/star.svg'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'
// Assets
import '../../assets/styles/poke-card.css'

class PokeCard extends React.Component {
  render() {
    const { pokemon } = this.props
    return (
      <div className="pk-card-wrapper">
        <div className={"pk-card card" + (pokemon.isTop ? " pk-top" : "")}>
          {pokemon.isTop &&
          <span className="pk-top-star">
            <IconStar />
            <div className="pk-top-tooltip">Top 200</div>
          </span>
          }
          <span className={"pk-name-stroke"}>{pokemon.number + " " + pokemon.name}</span>
          <span className="pk-name">{pokemon.number + " " + pokemon.name}</span>
          <div className="pk-section">
            <div className="pk-basic-info-container">
              <div className="pk-sprite-wrapper">
                <img className="pk-sprite" src={pokemon.sprite} alt={pokemon.name + " sprite"} />
              </div>
              <div className="pk-types">
                <TypeBadge type={pokemon.types[0]} />
                <TypeBadge type={pokemon.types[1]} />
              </div>
            </div>
            <div className="pk-stats-container">
              {Object.keys(pokemon.stats).map((stat) => {
                return <StatBar stat={stat} value={pokemon.stats[stat]} percentage={pokemon.adjStats[stat]}/>
              })}
            </div>
          </div>
          <div className="pk-section">
            <div className="pk-measures-container">
              <p className="pk-measure-title">Height</p>
              <p className="pk-measure-value">{(pokemon.height / 10)+"m"}</p>
            </div>
            <div className="pk-measures-container">
              <p className="pk-measure-title">Weight</p>
              <p className="pk-measure-value">{(pokemon.weight / 10)+"kg"}</p>
            </div>
          </div>
          <div className="pk-section">
            <div className="pk-abilities-container">
              <span className="pk-abilities-title">Abilities</span>
              {pokemon.abilities.map((abil) =>
                <span className="pk-ability-name" title={abil}>{abil}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PokeCard