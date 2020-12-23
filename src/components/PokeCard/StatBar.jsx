// Core
import React from 'react';
// Assets
import { ReactComponent as IconSta } from '../../assets/icons/stam.svg';
import { ReactComponent as IconAtk } from '../../assets/icons/atk.svg';
import { ReactComponent as IconDef } from '../../assets/icons/def.svg';
import { ReactComponent as IconSpAtk } from '../../assets/icons/spatk.svg';
import { ReactComponent as IconSpDef } from '../../assets/icons/spdef.svg';
import { ReactComponent as IconSpd } from '../../assets/icons/speed.svg';
import { ReactComponent as IconStar } from '../../assets/icons/star.svg'

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
    switch (stat) {
      case 'hp':
       return 'HP'
      case 'attack':
        return 'ATK'
      case 'defense':
       return 'DEF'
      case 'special-attack':
        return 'SpATK'
      case 'special-defense':
        return 'SpDEF'
      case 'speed':
        return 'SPD'
      default:
        return null
    }
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
      <div className="pk-stat-wrapper">
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