import React from 'react';

import {
  formatTime,
  formatPercent
} from '../../utils';

export default class GoalListItemExpanded extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};

    this.loadHistory = this.loadHistory.bind(this);
  }

  loadHistory() {
    this.setState({
      showHistory: true
    });
  }

  render () {
    const goal = this.props.goal;
    return (
      <ul>
      <table>
        <tbody>
          <tr>
            <td>🏃</td>
            <td>{formatTime(goal.startTime)}</td>
            <td>{goal.startValue}</td>
          </tr>
          {this.state.showHistory ?
            this.props.items.map((item, key) =>
              <tr key={key}>
                <td></td>
                <td>{item.time}</td>
                <td>{item.value}</td>
              </tr>
            ) : this.props.items ?
              <tr>
                <td colspan="3">
                  <a onClick={this.loadHistory}>[...]</a>
                </td>
              </tr> : null
          }
          <tr>
            <td>➤</td>
            <td>{formatTime(new Date())}</td>
            <td>{goal.value}</td>
          </tr>
          <tr>
            <td colpan="3">...</td>
          </tr>
          <tr>
            <td>💯</td>
            <td>{formatTime(goal.goalTime)}</td>
            <td>{goal.goalValue}</td>
          </tr>
        </tbody>
      </table>
      <li>
        <a onClick={() => {this.props.showProgress(goal)}}>Show progress</a>
      </li>
      <li>
        <a onClick={() => {this.props.showRegisterProgress(goal)}}>Register progress</a>
      </li>
    </ul>
    );
  }
}
