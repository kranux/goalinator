import React from 'react';

import BaseForm from '../base-form'
import {formatTime} from '../../utils';

export default class ProgressForm extends BaseForm {

  render() {
    return (
      <div>
        <h3>Register "{this.props.goal.name}" progress</h3>
        {this.wrapFormElement([
          this.wrapInputElement('Time',
            <input
              name="time"
              onChange={this.handleChange}
              type="date"
              value={formatTime(this.state.time)}
            />),
          this.wrapInputElement('Value',
            <input
              name="value"
              onChange={this.handleChange}
              type="number"
              value={this.state.value}
            />)
        ])}
      </div>
    )};
}
