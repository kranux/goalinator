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

  constructor(props) {
    super(props);
    this.state = {};
    this.showExpanded = this.showExpanded.bind(this);
  }

  showExpanded() {
    this.setState({expanded: true});
  }

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
        <span><a onClick={() => {this.props.showRegisterProgress(goal)}}>[ + ]</a></span>
        <span><a onClick={this.showExpanded}>[ ... ]</a></span>
        {this.state.expanded ?
          <GoalListItemExpanded
            goal={goal}
            items={this.props.items}
            showProgress={this.props.showProgress}
            showRegisterProgress={this.props.showRegisterProgress}
          /> : null}
      </li>);
  }
}
