// Core
import React from 'react';
// Assets
import { ReactComponent as IconSta } from '../../assets/icons/stam.svg';
import { ReactComponent as IconAtk } from '../../assets/icons/atk.svg';
import { ReactComponent as IconDef } from '../../assets/icons/def.svg';
import { ReactComponent as IconSpAtk } from '../../assets/icons/spatk.svg';
import { ReactComponent as IconSpDef } from '../../assets/icons/spdef.svg';
import { ReactComponent as IconSpd } from '../../assets/icons/speed.svg';

class StatBar extends React.Component {
  renderIcon(stat) {
    switch(stat) {
      case 'hp':
        return <IconSta />
      case 'attack':
        return <IconAtk />
      case 'defense':
        return <IconDef />
      case 'special-attack':
        return <IconSpAtk />
      case 'special-defense':
        return <IconSpDef />
      case 'speed':
        return <IconSpd />
      default:
        return null
    }
  }

  getAbbreviation(stat) {
    const dict = {
      'hp': 'HP',
      'attack': 'ATK',
      'defense': 'DEF',
      'special-attack': 'SpATK',
      'special-defense': 'SpDEF',
      'speed': 'SPD',
    }
    return dict[stat]
  }

  getFullName(stat) {
    const dict = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Special Attack',
      'special-defense': 'Special Defense',
      'speed': 'Speed',
    }
    return dict[stat]
  }

  render() {
    const { stat, value, percentage } = this.props
    let renderedPercentage = percentage
    if (percentage === null && value !== null) {
      renderedPercentage = (value/255.0)
    }
    let adjustment = (20/7)*renderedPercentage - 6/7
    adjustment =  Math.min(Math.max(adjustment, 0), 1)
    const saturation = Math.min(Math.max(adjustment, 0.6), 1)
    const hue = adjustment*130
    const lightness = 50 - adjustment*15
    const backgroundColor = "hsl("+hue+"deg "+saturation*100+"% "+lightness+"%)"
    return (
      <div className="pk-stat-wrapper" title={this.getFullName(stat)}>
        <div className="pk-stat-icon-wrapper">
          {this.renderIcon(stat)}
          <div className="pk-stat-tooltip">{this.getAbbreviation(stat)}</div>
        </div>
        <div className="pk-stat-bar-wrapper">
          <div className="pk-stat-bar pk-stat-bar-empty"/>
          <div style={{width: renderedPercentage*100 + "%", backgroundColor}} className="pk-stat-bar pk-stat-bar-fill"/>
        </div>
        <div className="pk-stat-value-wrapper">
          <span className="pk-stat-value">{value}</span>
        </div>
      </div>
    )
  }
}

export default StatBar