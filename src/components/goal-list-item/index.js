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

import GoalListItemExpanded from './goal-list-item-expanded';

export default class GoalListItem extends React.Component {

  render() {
    const goal = this.props.goal;

    return (
      <li
        className={"list-item "+ (this.props.expanded ? 'expanded' : 'collapsed')}
        onClick={() => {!this.props.expanded && this.props.toggleExpanded(goal)}}
      >
        <span className="name">
          {goal.name}
        </span>
        <span className={isGoalToRightDirection(goal) ? 'green' : 'red'}>
          {formatPercent(calculateProgressInPercent(goal))}%
        </span>
        <span className={isProgressSymetricToTime(goal) ? 'green' : 'red'}>
          {calculateDaysLeft(goal)} days left
        </span>
        <span><a onClick={() => {this.props.showRegisterProgress(goal)}}>[ + ]</a></span>
        {this.props.expanded ?
          <GoalListItemExpanded
            goal={goal}
            historyVisible={this.props.historyVisible}
            items={this.props.items}
            showProgress={this.props.showProgress}
            showRegisterProgress={this.props.showRegisterProgress}
            toggleHistoryVisible={this.props.toggleHistoryVisible}
          /> : null}
      </li>);
  }
}
