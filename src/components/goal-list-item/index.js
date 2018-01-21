import React from 'react';

import {
  formatTime,
  formatPercent,
  calculateDifferenceInDays
} from '../../utils';

const calculateProgressInPercent = goal => {
  const lambda = goal.startValue - goal.value;
  const goalLambda = goal.startValue - goal.goalValue;
  return lambda / goalLambda * 100;
}

const calculateDaysLeft = goal =>
  calculateDifferenceInDays(goal.startTime, goal.goalTime);

export default class GoalListItem extends React.Component {

  render() {
    const goal = this.props.goal;

    return  (
      <li>
        <span className="name">
          {goal.name}
        </span>
        <span className="progress">
          Progress: {formatPercent(calculateProgressInPercent(goal))}%
        </span>
        <span className="daysLeft">
          {calculateDaysLeft(goal)} days to go
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
