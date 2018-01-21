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

const calculateDaysGoneInPercent = goal => {
  const daysLambda = calculateDifferenceInDays(goal.startTime, goal.goalTime);
  const daysSinceStart = calculateDifferenceInDays(goal.startTime, new Date());
  return daysSinceStart / daysLambda * 100;
}

const calculateDaysLeft = goal =>
  calculateDifferenceInDays(new Date(), goal.goalTime);

const isGoalToRightDirection = goal => {
  const goalSign = Math.sign(goal.startValue - goal.goalValue);
  const progressSign = Math.sign(goal.startValue - goal.value);
  return goalSign === progressSign;
}

const isProgressSymetricToTime = goal => {
  return calculateProgressInPercent(goal) >= calculateDaysGoneInPercent(goal);
}

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
