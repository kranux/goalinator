import React from 'react';

import {
  formatTime,
  formatPercent
} from '../../utils';

export default class GoalListItemExpanded extends React.Component {

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
            {this.props.historyVisible ?
              this.props.items.slice(0, -1).map(item =>
                <tr key={item.id}>
                  <td></td>
                  <td>{formatTime(item.time)}</td>
                  <td>{item.value}</td>
                </tr>
              ) : this.props.items.length ?
                <tr>
                  <td colSpan="3">
                    <a onClick={() => {this.props.toggleHistoryVisible(goal)}}>[...]</a>
                  </td>
                </tr> : null
            }
            <tr>
              <td>➤</td>
              <td>{formatTime(new Date())}</td>
              <td>{goal.value}</td>
            </tr>
            <tr>
              <td colSpan="3">...</td>
            </tr>
            <tr>
              <td>💯</td>
              <td>{formatTime(goal.goalTime)}</td>
              <td>{goal.goalValue}</td>
            </tr>
          </tbody>
        </table>
      </ul>
    );
  }
}
