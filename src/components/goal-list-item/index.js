import React from 'react';

import {
  formatTime,
  formatPercent
} from '../../utils';

import {
  isGoalToRightDirection,
  calculateProgressInPercent,
  isProgressSymetricToTime,
  calculateDaysLeft
} from '../../logic';

export default class GoalListItem extends React.Component {

  render() {
    const goal = this.props.goal;

    return (
      <li className="list-item">
        <span className="name">
          {goal.name}
        </span>
        <span className={isGoalToRightDirection(goal) ? 'green' : 'red'}>
          {formatPercent(calculateProgressInPercent(goal))}%
        </span>
        <span className={isProgressSymetricToTime(goal) ? 'green' : 'red'}>
          {calculateDaysLeft(goal)} days left
        </span>
        <ul>
          <span className="values">
            Current: {goal.value}
            {goal.startValue} &#x2192; {goal.goalValue}
          </span>
          <span className="time">{formatTime(goal.startTime)} {formatTime(goal.goalTime)}</span>
          <li>
            <a onClick={() => {this.props.showProgress(goal)}}>Show progress</a>
          </li>
          <li>
            <a onClick={() => {this.props.showRegisterProgress(goal)}}>Register progress</a>
          </li>
        </ul>
      </li>);
  }
}
