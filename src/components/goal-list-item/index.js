import React from 'react';

import {formatTime} from '../../utils';

export default class GoalListItem extends React.Component {

  render() {
    const goal = this.props.goal;
    return  (
      <li>
        <span className="name">{goal.name}</span>
        <span className="values">{goal.startValue} &#x2192; {goal.goalValue}</span>
        <span className="time">{formatTime(goal.startTime)} {formatTime(goal.goalTime)}</span>
        <ul className="controlls">
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
